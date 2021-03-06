Rails.application.routes.draw do

  #Devise
  devise_for :users
  devise_scope :user do
    authenticated :user do
      root 'welcome#home', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  #Adminstrate Admim
  namespace :admin do
    resources :sprints
    resources :tasks
    resources :recipes
    resources :ingredients
    resources :measurements
    resources :cookbooks
    root to: "tasks#index"
  end

  resources :spans do

end

  #scrum
  resources :sprints, only: [:new, :create, :index, :update, :edit, :show, :destroy] do
    resources :tasks, only: [:new, :create, :destroy, :edit, :update] do
      collection do
        patch :sort
      end
    end
  end
  #scrum visualizations
  resource :scrum_reports, only: :show, :defaults => { :format => 'csv' }
  resource :task_reports, only: :show, :defaults => { :format => 'csv' }
  resource :scrum_maps, only: :show, :defaults => { :format => 'csv' }

  #Recipes
  resources :recipes, only: [:index]
  resource :grocery_lists, only: :show, :defaults => { :format => 'csv' }
  resources :measurements, only: [:show], path: "recipes"

  #Sai Maa
  resources :tags, only: [:index, :show, :edit, :update, :destroy]
  resources :participants, only: [:index, :show]
  resource :duplicates, only: :show, :defaults => { :format => 'csv' }

  get 'dashboard' =>'dashboards#main'

  get 'gear_lift' =>'welcome#gear_lift'
  get 'fcfs' =>'welcome#fcfs'
  get 'business_plan' =>'welcome#business_plan'
  root to: 'welcome#home'

  get "welcome/download_pdf"
  ### Final Projects ###
  get '/projects/ski_resorts' =>'projects#ski_resorts'
  ### Scrum ###
  get '/scrum/area_chart' => 'scrum#area_chart'
  get '/scrum/vertical_stream' => 'scrum#vertical_stream'
  get '/scrum/radial_column' => 'scrum#radial_column'
  get '/scrum/radial_area' => 'scrum#radial_area'
  get '/scrum/scrolly_telling' => 'scrum#scrolly_telling'
  get '/scrum/sticky_notes' => 'scrum#sticky_notes'
  get '/scrum/grid' => 'scrum#grid'

  #Colorado River
  get '/colorado_river/area_test' => 'colorado_river#area_test'
  #GDP
  get '/gdp/area_tool' => 'gdp#area_tool'
  get '/gdp/line_tool' => 'gdp#line_tool'
  get '/gdp/radial_bubble' => 'gdp#radial_bubble'
  #Contact Form
  get 'welcome', to: 'messages#new', as: 'welcome'
  post 'welcome', to: 'messages#create'


end

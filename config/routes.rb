Rails.application.routes.draw do
  namespace :admin do
    resources :sprints
    resources :tasks
    resources :recipes
    resources :ingredients
    resources :measurements

    root to: "tasks#index"
  end

  resource :scrum_reports, only: :show, :defaults => { :format => 'csv' }
  resource :scrum_maps, only: :show, :defaults => { :format => 'csv' }
  root to: 'welcome#home'
  #Scrum
  get '/scrum/area_chart' => 'scrum#area_chart'
  get '/scrum/radial_column' => 'scrum#radial_column'
  get '/scrum/radial_area' => 'scrum#radial_area'
  #GDP
  get '/gdp/area_tool' => 'gdp#area_tool'
  get '/gdp/radial_bubble' => 'gdp#radial_bubble'


end

Rails.application.routes.draw do
  namespace :admin do
      resources :scrums

      root to: "scrums#index"
    end
  resource :scrum_reports, only: :show, :defaults => { :format => 'csv' }
  root to: 'welcome#home'
  get '/scrum/area_chart' => 'scrum#area_chart'
  get '/gdp/area_tool' => 'gdp#area_tool'


end

Rails.application.routes.draw do
  namespace :admin do
      resources :scrums

      root to: "scrums#index"
    end
  resource :scrum_reports, only: :show, :defaults => { :format => 'csv' }
  root to: 'welcome#home'
  #Scrum
  get '/scrum/area_chart' => 'scrum#area_chart'
  #GDP
  get '/gdp/area_tool' => 'gdp#area_tool'
  get '/gdp/radial_bubble' => 'gdp#radial_bubble'


end

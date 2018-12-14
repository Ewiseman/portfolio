Rails.application.routes.draw do
  namespace :admin do
      resources :scrums

      root to: "scrums#index"
    end
  root to: 'welcome#home'
end

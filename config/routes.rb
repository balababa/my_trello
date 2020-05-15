Rails.application.routes.draw do
  resources :cards, only: [:create, :update, :destroy] do
    member do
      put :move
    end
  end
  
  resources :lists, only: [:index, :create, :update, :destroy] do
    member do
      put :move
    end
  end


  devise_for :users
  root 'lists#index'

 
end

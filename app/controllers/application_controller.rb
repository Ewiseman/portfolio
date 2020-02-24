class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception

    rescue_from Pundit::NotAuthorizedError do |exception|
      redirect_to root_url, alert: exception.message
    end

    protected

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || sprints_path
  end

end

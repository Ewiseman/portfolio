class ApplicationMailer < ActionMailer::Base
  default from: 'ewiseman1@gmail.com.com'
  layout 'mailer'

  def grocery_list(recipe)
    mail(to: "ewiseman1@gmail.com", subject: "Your Grocery List - #{Date.today}")
  end
end

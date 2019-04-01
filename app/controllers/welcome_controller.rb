class WelcomeController < ApplicationController

  def download_pdf
    send_file(
      "#{Rails.root}/public/resume.pdf",
      filename: "resume.pdf",
      type: "application/pdf"
    )
  end

  def gear_lift
    render layout: 'navbar_two'
  end

  def fcfs
    render layout: 'navbar_two'
  end

  def business_plan
    render layout: 'no_navbar'
  end

end

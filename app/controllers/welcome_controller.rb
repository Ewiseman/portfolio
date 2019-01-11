class WelcomeController < ApplicationController

  def download_pdf
  send_file(
    "#{Rails.root}/public/resume.pdf",
    filename: "resume.pdf",
    type: "application/pdf"
  )
end

end

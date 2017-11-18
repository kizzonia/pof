class NotifyMailer < ApplicationMailer
  default from: 'notify@pof.com'

def self.send_request(row)
    emails = ['daveskeen24@gmail.com', 'delightedchika@gmail.com']
    
    emails.each do |email|
      new_request(email,row).deliver_now
      # or
      #new_request(email,row).deliver_later
      
    end
  end

  def new_request(email, row)
    @item = row

    mail(to: email, subject: 'New request')

  end
end
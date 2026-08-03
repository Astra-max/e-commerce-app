export const HelpSupportView = () => {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes up to 2 weeks for Kisumu/Kakamega and next day delivery for Nairobi.",
    },
    {
      q: "Can I pay Cash on Delivery?",
      a: "Yes, cash on delivery or M-Pesa is supported at checkout.",
    },
    {
      q: "How do I return an item?",
      a: "Contact us within 7 days of purchase. Return shipping is free.",
    },
  ];

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Help & Support</h2>
        <p className="profile-view-subtitle">Find answers to commonly asked questions or reach out to our team</p>
      </div>

      <div className="faqs-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faqs-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-support-card">
        <h3>Need direct assistance?</h3>
        <p>Email our support desk and we'll reply within 24 hours.</p>
        <a href="mailto:support@westmart.com" className="support-email-btn">Email support@westmart.com</a>
      </div>
    </div>
  );
};

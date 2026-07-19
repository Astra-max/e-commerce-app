// Amazon-style footer for WestMart
const Footer = () => {
  return (
    <footer className="footer-display">
      {/* Main columns */}
      <div className="west-mart">
        <div className="footer-elements">
          <p>Get to know us</p>
          <div className="listing">
            <p>Careers</p>
            <p>Blog</p>
            <p>About WestMart</p>
            <p>Our Offices</p>
            <p>Social Accounts</p>
            <p>Eldoret Majengo House</p>
            <p>Kakamega Township House</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>Make Money with Us</p>
          <div className="listing">
            <p>Sell on WestMart</p>
            <p>Sell under Private Brands</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
            <p>Host a WestMart Hub</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>WestMart Payment Products</p>
          <div className="listing">
            <p>WestMart Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
            <p>Currency Converter</p>
            <p>Smart Payment Systems</p>
            <p>Gift Cards</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>Let Us Help You</p>
          <div className="listing">
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates &amp; Policies</p>
            <p>Returns &amp; Replacements</p>
            <p>Manage Your Content</p>
            <p>Help Center</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>Our Policy</p>
          <div className="listing">
            <p>Honesty</p>
            <p>Convenience</p>
            <p>Accountability</p>
            <p>Transparency</p>
            <p>Reliability</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>Contact Info</p>
          <div className="listing">
            <p>+254 796 066 170</p>
            <p>+254 784 656 89</p>
            <p>westmart.trade@gmail.com</p>
            <p>westmart.ltd@gmail.com</p>
          </div>
        </div>

        <div className="footer-elements">
          <p>WestMart Trends &amp; News</p>
          <div className="listing">
            <p>Black Fridays</p>
            <p>Smart Payment Systems</p>
            <p>Security and Delivery</p>
            <p>WestMart Gift Cards</p>
            <p>Bonuses and Offers</p>
          </div>
        </div>
      </div>

      <div className="footer-brand">
        <a href="/" className="footer-logo">
          West<span>Mart</span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="endpage">
        <div className="endpage-links">
          <p>Conditions of Use</p>
          <span>•</span>
          <p>Privacy Notice</p>
          <span>•</span>
          <p>Your Ads Privacy Choices</p>
        </div>
        <p className="copyright">© 2024 WestMart Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

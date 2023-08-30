interface typeContact {
  img: string;
  title: string;
  link: string;
  id: number;
}

function ContactPage() {
  const contactUser: typeContact[] = [
    {
      img: "/github.png",
      title: "Github",
      link: "https://github.com/nab1eva",
      id: 1,
    },
    {
      img: "/telegram.png",
      title: "Telegram",
      link: "https://t.me/+998901371317",
      id: 2,
    },
    {
      img: "/instagram.png",
      title: "Instagram",
      link: "https://www.instagram.com/zaxurosan/",
      id: 3,
    },
    {
      img: "/phone.png",
      title: "Telephone",
      link: "tel: +998901371317",
      id: 4,
    },
  ];
  return (
    <section>
      <div>
        <h1 className="login-title">Contact</h1>
        <div className="contact-box">
          <form className="form-container">
            <input
              className="login-input"
              type="text"
              placeholder="Your Name"
            />
            <input
              className="login-input"
              type="email"
              placeholder="Your Email"
            />
            <textarea className="login-input" placeholder="Messages"></textarea>
            <button className="button" type="submit">
              Send messages
            </button>
          </form>
          <ul>
            {contactUser.map((el) => {
              return (
                <li key={el.id}>
                  <a target="blank" href={el.link}>
                    <img src={el.img} alt="Github" />
                    <h2>{el.title}</h2>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;

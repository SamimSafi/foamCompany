export default function Footer() {
  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center">
          <li>
            <span className="font-bold">Your name:</span>Name
          </li>
          <li>
            <span className="font-bold">Your email:</span> email
          </li>
          <li>
            <span className="font-bold">Phone number:</span> Phone
          </li>
          <li>
            <span className="font-bold">Bank:</span> Bank
          </li>
          <li>
            <span className="font-bold">Account holder:</span> Account holder
          </li>
          <li>
            <span className="font-bold">Account number:</span> bank Account
          </li>
          <li>
            <span className="font-bold">Website:</span>{" "}
            <a href="#" target="_blank" rel="noopenner noreferrer">
              webSite
            </a>
          </li>
        </ul>
      </footer>
    </>
  )
}

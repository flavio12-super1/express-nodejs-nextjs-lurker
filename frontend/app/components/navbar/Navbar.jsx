import Link from "next/link";
import "./Navbar.css";
import More from "./more/More";

function Navbar() {
  const myEmail = "testing@gmail.com";
  const friendRequests = [
    {
      id: 1,
    },
  ];

  return (
    <div id="outerNavDiv">
      <div id="innerNavDiv">
        <nav>
          <div>
            <Link href="/app">
              <div className="divImg">
                <img
                  src="/nav-icons/spider.png"
                  alt="lurker spider"
                  className="navIcons"
                />
              </div>
            </Link>
          </div>
          <div className="octagon">
            <Link href="/app/channel/servers/" className="navStyle">
              <div className="rounded-button">
                <img
                  className="octo-image"
                  src="/nav-icons/servers.png"
                  alt="messages"
                />
              </div>
            </Link>
            <Link href="/app/channel/groups/" className="navStyle">
              <div className="rounded-button">
                <img
                  className="octo-image"
                  src="/nav-icons/groups.png"
                  alt="messages"
                />
              </div>
            </Link>
            <Link href="/app/channel/messages/" className="navStyle">
              <div className="rounded-button">
                <img
                  className="octo-image"
                  src="/nav-icons/messages.png"
                  alt="messages"
                />
              </div>
            </Link>
          </div>

          <div>
            <Link href="/app/explore" className="navStyle">
              <div className="divImg">
                <img
                  className="navIcons"
                  src="/nav-icons/explore.png"
                  alt="explore"
                />
              </div>
            </Link>
          </div>
          {/* start notifications */}
          <div>
            <Link href="/app/notifications" className="navStyle">
              <div className="divImg">
                <div className="bell">
                  <img
                    className="navIcons"
                    src="/nav-icons/bell.png"
                    alt="notifications"
                  />
                  {friendRequests.length > 0 ? (
                    <div id="notificationIcon">{friendRequests.length}</div>
                  ) : null}
                </div>
              </div>
            </Link>
          </div>
          {/* enednotifications  */}
          <div>
            <Link href={"/app/" + myEmail} className="navStyle">
              <div className="divImg">
                <img
                  className="navIcons"
                  src="/nav-icons/profile.png"
                  alt="profile"
                />
              </div>
            </Link>
          </div>
        </nav>
      </div>
      <More />
      {/* <div>
        <div onClick={handleMore} className="navStyle">
          <div className="divImg">
            <img className="navIcons" src="/nav-icons/more.png" alt="more" />
          </div>
        </div>
      </div>
      <div id="popup">
        {collaps ? (
          <div>
            <div id="moreOuterDiv">
              <div id="moreInnerDiv">
                <div className="moreOptionsDiv">
                  <div className="moreOptions">Settings</div>
                  <div className="moreOptions">Themes</div>
                </div>
                <div id="separator"></div>
                <div className="moreOptionsDiv">
                  <div className="moreOptions">Accounts</div>
                  <div className="moreOptions" onClick={handleLogout}>
                    Log Out
                  </div>
                </div>
              </div>
              <div id="moreArrow"></div>
            </div>
          </div>
        ) : null}
      </div> */}
    </div>
  );
}

export default Navbar;

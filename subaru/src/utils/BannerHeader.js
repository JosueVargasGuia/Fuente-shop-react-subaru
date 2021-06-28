import {
    nav_banner
} from "../service/ENUM";
export default function BannerHeader() {
    return (<>
        {nav_banner.status === 1 ? <div className="header-nav-banner">
            {nav_banner.text}
        </div> : <></>}
    </>)
}
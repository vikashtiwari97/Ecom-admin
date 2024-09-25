import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
   
    return (
        <>
            {/*  <!-- Sidebar --> */}
            <ul className={style} id="accordionSidebar">

                {/*  <!-- Sidebar - Brand --> */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Astha Admin</div>
                    <div className="text-center d-none d-md-inline icon-sidebar">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                    </div>
                </Link>

                {/*   <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/*  <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <Link className="nav-link" to="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>

                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/*   <!-- Heading --> */}
                <div className="sidebar-heading">
                    Interface
                </div>

                                                {/* <!-- Nav Item - Pages Collapse Menu --> */}
<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseFeature"
        aria-expanded="true" aria-controls="collapseFeature">
        <i className="fas fa-fw fa-cog"></i>
        <span>Feature Product</span>
    </Link>
    <div id="collapseFeature" className="collapse" aria-labelledby="headingFeature" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-feature-product">Add Feature Product</Link>
            <Link className="collapse-item" to="/all-feature-product">All Feature Product</Link>
        </div>
    </div>
</li>

<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseSilver"
        aria-expanded="true" aria-controls="collapseSilver">
        <i className="fas fa-fw fa-cog"></i>
        <span>Silver Product</span>
    </Link>
    <div id="collapseSilver" className="collapse" aria-labelledby="headingSilver" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-silver-product">Add Silver Product</Link>
            <Link className="collapse-item" to="/all-silver-product">All Silver Product</Link>
        </div>
    </div>
</li>

<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTrending"
        aria-expanded="true" aria-controls="collapseTrending">
        <i className="fas fa-fw fa-cog"></i>
        <span>Trending Product</span>
    </Link>
    <div id="collapseTrending" className="collapse" aria-labelledby="headingTrending" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-Trending-product">Add Trending Product</Link>
            <Link className="collapse-item" to="/all-Trending-product">All Trending Product</Link>
        </div>
    </div>
</li>

<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseSample"
        aria-expanded="true" aria-controls="collapseSample">
        <i className="fas fa-fw fa-cog"></i>
        <span>Sample Product</span>
    </Link>
    <div id="collapseSample" className="collapse" aria-labelledby="headingSample" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-Sample-product">Add Sample Product</Link>
            <Link className="collapse-item" to="/all-Sample-product">All Sample Product</Link>
        </div>
    </div>
</li>

{/* <li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseNewFeature"
        aria-expanded="true" aria-controls="collapseNewFeature">
        <i className="fas fa-fw fa-cog"></i>
        <span>New Feature Product</span>
    </Link>
    <div id="collapseNewFeature" className="collapse" aria-labelledby="headingNewFeature" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-new-product">Add SlideImage Product</Link>
            <Link className="collapse-item" to="/all-new--product">All New-Feature Product</Link>
        </div>
    </div>
</li> */}

<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseSlideImage"
        aria-expanded="true" aria-controls="collapseSlideImage">
        <i className="fas fa-fw fa-cog"></i>
        <span>SlideImage</span>
    </Link>
    <div id="collapseSlideImage" className="collapse" aria-labelledby="headingSlideImage" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-SlideImage">Add SlideImage</Link>
            <Link className="collapse-item" to="/all-SlideImage">All SlideImage</Link>
        </div>
    </div>
</li>


<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseGoldenBangles"
        aria-expanded="true" aria-controls="collapseGoldenBangles">
        <i className="fas fa-fw fa-cog"></i>
        <span>Golden Bangles</span>
    </Link>
    <div id="collapseGoldenBangles" className="collapse" aria-labelledby="headingGoldenBangles" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-golden-bangles">Add Golden Bangles</Link>
            <Link className="collapse-item" to="/all-golden-bangles">All Golden Bangles</Link>
        </div>
    </div>
</li>

<li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseCollections"
        aria-expanded="true" aria-controls="collapseCollections">
        <i className="fas fa-fw fa-cog"></i>
        <span>Collections</span>
    </Link>

    <div id="collapseCollections" className="collapse" aria-labelledby="headingCollections" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-collections">Add Collections</Link>
            <Link className="collapse-item" to="/all-collections">All Collections</Link>
        </div>
    </div>
</li>


                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">
                 Categories
                </div>
                {/*     <!-- Nav Item - Pages Collapse Menu --> */}


                <li className="nav-item">
    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseProducts"
        aria-expanded="true" aria-controls="collapseProducts">
        <i className="fas fa-fw fa-folder"></i>
        <span>Products</span>
    </Link>
    <div id="collapseProducts" className="collapse" aria-labelledby="headingProducts" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Add or Get:</h6>
            <Link className="collapse-item" to="/add-products">Add Products</Link>
            <Link className="collapse-item" to="/all-products">All Products</Link>
        </div>
    </div>
</li>




                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/*   <!-- Sidebar Toggler (Sidebar) --> */}
                {/*   <div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
</div> */}

                {/*  <!-- Sidebar Message --> */}

            </ul>
        </>
    )
}

export default Sidebar

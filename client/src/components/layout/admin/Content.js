import React from 'react'

const Content = () => {
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="mb-2 row">
                        <div className="col-sm-6">
                            <h1 className="m-0">Stats</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#!">Admin</a></li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    {/* Info boxes */}
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-info elevation-1"><i className="fas fa-user" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Agents</span>
                                    <span className="info-box-number">
                                        10
                                    </span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="mb-3 info-box">
                                <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-plus" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Patients</span>
                                    <span className="info-box-number">41,410</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        {/* fix for small devices only */}
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="mb-3 info-box">
                                <span className="info-box-icon bg-success elevation-1"><i className="fas fa-user" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Doctors</span>
                                    <span className="info-box-number">760</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="mb-3 info-box">
                                <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Paramedics</span>
                                    <span className="info-box-number">2,000</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                    </div>
                </div>{/*/. container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default Content

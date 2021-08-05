import React, { useEffect } from 'react'
import $ from 'jquery';

const LifeEvents = () => {
    useEffect(() => {
        $(document).ready(function () {
            $('#death-events-table').DataTable();
        });
    }, [])
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="mb-2 row">
                        <div className="col-sm-6">
                            <h1 className="m-0">Death Events</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">Hospital</li>
                                <li className="breadcrumb-item">Dashboard</li>
                                <li className="breadcrumb-item">Death Events</li>
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
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h1 className="card-title">
                                        Patients
                                    </h1>
                                </div>
                                <div className="card-body">
                                    <table id="death-events-table" className="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Diagnosis</th>
                                                <th>ID</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                        <tfoot></tfoot>
                                    </table>
                                </div>
                                <div className="card-footer">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/. container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default LifeEvents

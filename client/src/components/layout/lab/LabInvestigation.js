import React, { useState } from 'react'

const LabInvestigation = () => {

  const [aadhaarNumber, setAadhaarNumber] = useState("")

  const handleChange = e => {
    setAadhaarNumber(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Fetch assigned tests where sample is taken
    // 
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-8">
              <h1 className="m-0">Lab Investigation</h1>
            </div>{/* /.col */}
            <div className="col-sm-4">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="mb-3 input-group">
                    <input
                      onChange={handleChange}
                      type="text"
                      maxLength="12"
                      name="aadhaarNumber"
                      id="aadhaar"
                      className="form-control"
                      placeholder="Enter Patient's Aadhaar Number"
                    />
                    <div className="input-group-append">
                      <input type="submit" value="Go" className="float-right input-group-text bg-red btn btn-warning btn-sm" />
                    </div>
                  </div>
                </div>
              </form>
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

            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default LabInvestigation

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const UploadImagingReport = props => {
  const patientId = props.match.params.patientId
  const testId = props.match.params.testId


  const [reportFile, setReportFile] = useState({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedReport, setUploadedReport] = useState({})

  const handleChange = e => {
    setReportFile(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (reportFile.name) {
      const formData = new FormData()
      formData.append('reportFile', reportFile);

      try {
        const res = await axios.post(`/api/lab/data/uploadLabReport?testId=${testId}`, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            setUploadProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
            setTimeout(() => {
              setUploadProgress(0)
              props.history.push(`/lab/dashboard/revealAssignedImagingTests/${patientId}`)
            }, 3000)
          }
        })
        setUploadedReport(res.data.filePath)
        toast('Report uploaded', { type: 'success' })
      } catch (err) {
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      }
    } else {
      toast('Please select a report to upload', { type: 'error' })
    }
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Upload Imaging Report</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Laboratory</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Upload Report</li>
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
              <form onSubmit={handleSubmit}>
                <div className="card card-primary">
                  <div className="card-header">
                    <h1 className="card-title">
                      Imaging Reports
                    </h1>
                    <div className="card-tools">
                      <Link to={`/lab/dashboard/revealAssignedImagingTests/${patientId}`} className="m-0 bg-white btn btn-sm">Go Back</Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form">
                      <div className="input-group">
                        <div className="custom-file">
                          <input type="file" accept=".xls,.xlsx,.pdf,.jpg,.jpeg,.png" onChange={handleChange} className="custom-file-input" id="exampleInputFile" />
                          <label className="custom-file-label" htmlFor="exampleInputFile">{reportFile && reportFile.name ? reportFile.name : "Choose File"}</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-4 progress">
                      <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: uploadProgress + '%' }} >
                        {uploadProgress + '%'}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <input type="submit" value="Upload Report" className="float-right btn btn-primary btn-sm" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default UploadImagingReport

// import CompassSVG from 'icons/compass.svg'
// import EyeSlashSVG from 'icons/eye-slash.svg'
// import SlashSVG from 'icons/slash.svg'
// import LockSVG from 'icons/blue-lock.svg'
// import DearFlipViewer from '../../../components/DearFlipViewer'
// export default function RoadMap() {
//   return (
//     <div className="why-you-need-wrapper">
//       <div className="container">
//         <div className='col-sm-12 text-center gap-2 d-flex flex-column justify-content-start align-items-start why-you-need-header mb-2'>
//           <div className="row text-center px-0 px-md-3">
//             <div className='col-sm-6'>
//               <div
//                 className="flip-card h-100 w-100 rounded-3 df-element d-flex flex-column justify-content-start align-items-start"              
//               >
//                 <label className='sample-label ms-3 mt-4'>Sample digital report</label>
//                 <DearFlipViewer
//                   pdfURL="/pdf/the-three-musketeers.pdf"
//                   height="600px"
//                   options={ {
//                     webgl: true,
//                     autoEnableOutline: false
//                   } }
//                 />
//               </div>
//             </div>
//             <div className='col-sm-6 ps-md-3'>
//               <div className='col-sm-12 text-start gap-2 d-flex flex-column justify-content-start align-items-center align-items-md-start why-you-need-header mb-4'>
//                 <span className='why-slogan mt-4 mt-md-0'>The solution</span>
//                 <h5 className='display-5 fw-bold text-center text-md-start'>Roadmap to <br /> Transparency</h5>
//               </div>
//               <div className='col-sm-12 text-start gap-2 d-flex flex-column justify-content-start align-items-start why-you-need-content'>
//                 <div className="row text-start">
//                   <div className="col-sm-6 d-flex flex-column justify-content-start align-items-center align-items-md-start">
//                     <div className='icon-wrap mb-3'>
//                       <CompassSVG  />
//                     </div>
//                     <h6 className='fw-bold'>Standardized performance metrics</h6>
//                     <p className='opacity-75 text-center text-md-start'>We provide a unified benchmark to compare private funds reliably.</p>
//                   </div>
//                   <div className="col-sm-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start">
//                     <div className='icon-wrap mb-3'>
//                       <EyeSlashSVG />
//                     </div>              
//                     <h6 className='fw-bold'>Expose hidden risks</h6>
//                     <p className='opacity-75 text-center text-md-start'>Shines light on disintermediation and adverse selection in co-investing.</p>
//                   </div>
//                   <div className="col-sm-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start">
//                     <div className='icon-wrap mb-3'>
//                       <SlashSVG />
//                     </div>              
//                     <h6 className='fw-bold'>No more benchmark shopping</h6>
//                     <p className='opacity-75 text-center text-md-start'>Eliminates the practice of cherry-picking favorable indexes.</p>
//                   </div>
//                   <div className="col-sm-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start">
//                     <div className='icon-wrap mb-3'>
//                       <LockSVG /> 
//                     </div>  
//                     <h6 className='fw-bold'>Counter distorted returns</h6>
//                     <p className='opacity-75 text-center text-md-start'>Adjusts for time-zero bias and subscription credit distortions.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className='col-sm-12 mt-4 text-center text-md-start'>
//                 {/* <button className='read-btn'>Read our Whitepaper</button> */}
//                 <div className="_df_button read-btn" 
//                   data-source="/pdf/whitepaper.pdf">Read our Whitepaper</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




import { useState, useRef, useEffect, lazy, Suspense } from 'react'

/* Lazy SVGs */
const CompassSVG = lazy(() => import('icons/compass.svg'))
const EyeSlashSVG = lazy(() => import('icons/eye-slash.svg'))
const SlashSVG = lazy(() => import('icons/slash.svg'))
const LockSVG = lazy(() => import('icons/blue-lock.svg'))

/* Lazy DearFlipViewer */
const DearFlipViewer = lazy(() => import('../../../components/DearFlipViewer'))

/* Skeleton placeholder while PDF loads */
function PDFSkeleton({ height }) {
  return (
    <div
      style={{
        width: '100%',
        height: height || '600px',
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
      }}
    />
  )
}

export default function RoadMap() {
  const [loadPDF, setLoadPDF] = useState(false)
  const pdfWrapperRef = useRef(null)

  /* Intersection Observer: load PDF only when in viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadPDF(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading slightly before visible
    )

    if (pdfWrapperRef.current) observer.observe(pdfWrapperRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="why-you-need-wrapper">
      <div className="container">
        <div className="col-sm-12 gap-2 d-flex flex-column justify-content-start align-items-start why-you-need-header mb-2">
          <div className="row text-center px-0 px-md-3">
            {/* Left: Flip Viewer */}
            <div className="col-sm-6">
              <div className="flip-card h-100 w-100 rounded-3 df-element d-flex flex-column justify-content-start align-items-start">
                <label className="sample-label ms-3 mt-4">Sample digital report</label>

                <div ref={pdfWrapperRef} style={{ width: '100%' }}>
                  {!loadPDF && <PDFSkeleton height="600px" />}
                  {loadPDF && (
                    <Suspense fallback={<PDFSkeleton height="600px" />}>
                      <DearFlipViewer
                        pdfURL="/pdf/the-three-musketeers.pdf"
                        height="600px"
                        options={{
                          webgl: true,
                          autoEnableOutline: false,
                        }}
                      />
                    </Suspense>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Text & Icons */}
            <div className="col-sm-6 ps-md-3">
              <div className="col-sm-12 text-start gap-2 d-flex flex-column justify-content-start align-items-center align-items-md-start why-you-need-header mb-4">
                <span className="why-slogan mt-4 mt-md-0">The solution</span>
                <h5 className="display-5 fw-bold text-center text-md-start">
                  Roadmap to <br /> Transparency
                </h5>
              </div>

              <div className="col-sm-12 text-start gap-2 d-flex flex-column justify-content-start align-items-start why-you-need-content">
                <div className="row text-start">
                  {[
                    { Icon: CompassSVG, title: 'Standardized performance metrics', desc: 'We provide a unified benchmark to compare private funds reliably.' },
                    { Icon: EyeSlashSVG, title: 'Expose hidden risks', desc: 'Shines light on disintermediation and adverse selection in co-investing.' },
                    { Icon: SlashSVG, title: 'No more benchmark shopping', desc: 'Eliminates the practice of cherry-picking favorable indexes.' },
                    { Icon: LockSVG, title: 'Counter distorted returns', desc: 'Adjusts for time-zero bias and subscription credit distortions.' },
                  ].map(({ Icon, title, desc }, i) => (
                    <div key={i} className="col-sm-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start mb-3">
                      <div className="icon-wrap mb-3">
                        <Suspense fallback={null}>
                          <Icon />
                        </Suspense>
                      </div>
                      <h6 className="fw-bold">{title}</h6>
                      <p className="opacity-75 text-center text-md-start">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-sm-12 mt-4 text-center text-md-start">
                <div className="_df_button read-btn" data-source="/pdf/whitepaper.pdf">
                  Read our Whitepaper
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

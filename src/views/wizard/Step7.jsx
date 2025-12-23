import { useEffect, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Input } from 'reactstrap'

import CustomScrollbar from '../../components/CustomScrollbar'
import Skeleton from 'react-loading-skeleton'
import Step7Skeleton from './skeleton/Step7Skeleton'

export default function Step7({ nextStep, widgetData, setWidgetData }) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(true)
  const [selectPerformance,setSelectPerformance] = useState('')
  // Call the fetch function when the component mounts
  // const handleNext = () => {
  //   try {
  //     if(!selectPerformance){
  //       return
  //     }
  //     setIsSubmitLoading(true)
  //     axios.put('/strategy/update/', { strategies: ['Growth'] }).then(()=>{

  //       setIsSubmitLoading(false)
  //     }).catch((error) => {
  //       console.error('Error updating strategies:', error)
  //     })
  //   } catch (error) {
  //     console.error('Error updating selected options:', error)
  //   }
  // }

  const [open, setOpen] = useState('')
  const toggle = id => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  useEffect(() => {
    if(widgetData?.['1']){
      setSelectPerformance(widgetData?.['1'])
    }
    setTimeout(() => {
      setIsSubmitLoading(false)
    }, 2000)
  }, [])

  return (
    <div className='step-out justify-content-start align-items-center mt-5'>
      <div className='card-layer-row w-100'>
        <div className='d-flex col-sm-12 d-flex flex-column'>
          <div className='search-section-row'>
            <label className='steps-counts'>
              {isSubmitLoading ? <Skeleton width={ 80 } height={ 20 } className='mb-2' /> : '1/8 steps'}
            </label>
            <h4 className='mb-0'>
              {isSubmitLoading ? (
                <Skeleton width={ 600 } height={ 20 } className='mb-1' />
              ) : (
                'What other analysis would you like to benchmark?'
              )}
            </h4>
            <label className='text-white mb-0'>
              {isSubmitLoading ? (
                <Skeleton width={ 500 } height={ 20 } />
              ) : (
                'Select one of the options below to further assess your performance'
              )}
            </label>
          </div>
          <div className='final-step-out'>
            {isSubmitLoading ? (
              Array.from({ length: 4 }).map((_, index) => <Step7Skeleton key={ index } />)
            ) : (
              <>
                <div
                  className={ `performance-content-box ${selectPerformance === 1 ? 'active' : ''}` }
                  onClick={ () => setSelectPerformance(1) }
                >
                  <CustomScrollbar height='100vh'>
                    <div className='p-3'>
                      <Input type='radio' className='d-none' />
                      <div className='question-hdr-row'>
                        <h6>Compare Your Performance with Manager Universe Benchmark</h6>
                        <div className='checkbox-content'>
                          <div className='white-dot'></div>
                          <span>
                            <svg height='13' width='16'>
                              <path
                                d='M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z'
                                fill='#88a4c7'
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className='paragraph-row'>
                        Compare performance against private market funds in the same vintage year,
                        asset class, and strategy to assess you ranks among peers in similar market
                        entry conditions.
                      </div>
                      <div className='second-question-row mt-3'>
                        <label>Why choose this?</label>
                        <p>
                          Understand how your performance measures up under similar conditions and
                          track the performance of a relevant peer group that shares your market
                          vintage.
                        </p>
                      </div>
                      <hr />
                      <div>
                        <Accordion flush open={ open } toggle={ toggle }>
                          <AccordionItem>
                            <AccordionHeader targetId='1'>
                              2018 US Venture Capital Funds
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                              Funds: A manager universe benchmark tracking private funds with a 2018
                              vintage year, measuring performance under similar market conditions.
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CustomScrollbar>
                </div>

                <div
                  className={ `performance-content-box ${selectPerformance === 2 ? 'active' : ''}` }
                  onClick={ () => setSelectPerformance(2) }
                >
                  <CustomScrollbar height='100vh'>
                    <div className='p-3'>
                      <Input type='radio' className='d-none' />
                      <div className='question-hdr-row'>
                        <h6>Compare Your Performance with Similar Public Benchmarks (PME)</h6>
                        <div className='checkbox-content'>
                          <div className='white-dot'></div>
                          <span>
                            <svg height='13' width='16'>
                              <path
                                d='M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z'
                                fill='#88a4c7'
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className='paragraph-row'>
                        This analysis helps measure outperformance against public market investments
                        with similar risk and return characteristics.
                      </div>
                      <div className='second-question-row mt-3'>
                        <label>Why choose this?</label>
                        <p>
                          Showcase how your investments compare to an investable public market
                          benchmarks that align closely with your risk and return profile.
                        </p>
                      </div>
                      <hr />
                      <div>
                        <Accordion flush open={ open } toggle={ toggle }>
                          <AccordionItem>
                            <AccordionHeader targetId='2'>MSCI Micro Cap Index</AccordionHeader>
                            <AccordionBody accordionId='2'>
                              MSCI USA Micro Cap Index: The market capitalization of firms in the
                              index has a median of $112.27 million. The index tracks the micro-cap
                              segment of the US equity market.
                            </AccordionBody>
                          </AccordionItem>
                          <AccordionItem>
                            <AccordionHeader targetId='3'>S&P MidCap 400</AccordionHeader>
                            <AccordionBody accordionId='3'>
                              S&P MidCap 400 Index: The market capitalization of firms in the index
                              has a median of $7.0 billion. The index represents mid-sized US
                              companies.
                            </AccordionBody>
                          </AccordionItem>
                          <AccordionItem>
                            <AccordionHeader targetId='4'>S&P SmallCap 600</AccordionHeader>
                            <AccordionBody accordionId='4'>
                              S&P SmallCap 600 Index: The market capitalization of firms in the
                              index has a median of $2.06 billion. The index tracks the small-cap
                              segment of the US equity market.
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CustomScrollbar>
                </div>

                <div
                  className={ `performance-content-box ${selectPerformance === 3 ? 'active' : ''}` }
                  onClick={ () => setSelectPerformance(3) }
                >
                  <CustomScrollbar height='100vh'>
                    <div className='p-3'>
                      <Input type='radio' className='d-none' />
                      <div className='question-hdr-row'>
                        <h6>Compare Your Performance with a Broad-Based Public Benchmark (PME)</h6>
                        <div className='checkbox-content'>
                          <div className='white-dot'></div>
                          <span>
                            <svg height='13' width='16'>
                              <path
                                d='M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z'
                                fill='#88a4c7'
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className='paragraph-row'>
                        This analysis helps evaluate the outperformance of your private market
                        investments compared to broad public market indices.
                      </div>
                      <div className='second-question-row mt-3'>
                        <label>Why choose this?</label>
                        <p>
                          Understand your investment&apos;s performance in relation to the broad
                          market and provide investors with a stable barometer of comparison.
                        </p>
                      </div>
                      <hr />
                      <div>
                        <Accordion flush open={ open } toggle={ toggle }>
                          <AccordionItem>
                            <AccordionHeader targetId='5'>Russell 3000</AccordionHeader>
                            <AccordionBody accordionId='5'>
                              Understand your investment&apos;s performance in relation to the broad
                              market and provide LPs with a stable barometer of comparison.
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CustomScrollbar>
                </div>
                <div
                  className={ `performance-content-box ${selectPerformance === 4 ? 'active' : ''}` }
                  onClick={ () => setSelectPerformance(4) }
                >
                  <CustomScrollbar height='100vh'>
                    <div className='p-3'>
                      <Input type='radio' className='d-none' />
                      <div className='question-hdr-row'>
                        <h6>Compare Your Performance with an Industry-Specific Benchmark</h6>
                        <div className='checkbox-content'>
                          <div className='white-dot'></div>
                          <span>
                            <svg height='13' width='16'>
                              <path
                                d='M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z'
                                fill='#88a4c7'
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className='paragraph-row'>
                        This analysis evaluates your fund’s performance against an industry-specific
                        public market benchmark using PME, while also benchmarking against private
                        market peers in the same vintage year, asset class, and strategy.
                      </div>
                      <div className='second-question-row mt-3'>
                        <label>Why choose this?</label>
                        <p>
                          Understand how your industry performs relative to both public markets and
                          similar private market funds.
                        </p>
                      </div>
                      <hr />
                      <div>
                        <Accordion flush open={ open } toggle={ toggle }>
                          <AccordionItem>
                            <AccordionHeader targetId='6'>S&P AI & Robotics Index</AccordionHeader>
                            <AccordionBody accordionId='6'>
                              S&P AI & Robotics Index: Tracks companies leading advancements in
                              artificial intelligence, robotics, automation, cloud computing,
                              autonomous vehicles, and other transformative technologies.
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </CustomScrollbar>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='button-row'>
        <button
          disabled={ !selectPerformance || isSubmitLoading }
          onClick={ () => {
            nextStep()
            setWidgetData({
              ...widgetData,
              '1': selectPerformance,
              step:2
            })
            localStorage.setItem('widgetData', JSON.stringify({
              ...widgetData,
              '1': selectPerformance,
              step:2
            }))
          } }
          className='btn'
        >
          {isSubmitLoading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  )
}

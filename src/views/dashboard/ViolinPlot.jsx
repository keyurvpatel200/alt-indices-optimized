import Plot from 'react-plotly.js'

export default function ViolinPlot () {
  // Example Size data
  const sizeData = [
    120, 130, 150, 180, 200, 220, 250, 270, 300, 320, 350, 400, 450, 500, 600,
    700, 800, 900, 1000, 1100, 1200,
  ]

  return (
    <div style={ { width: '100%', height: 'auto' } }>
      <Plot data={ [
        {
          type: 'violin',
          y: sizeData,
          box: {
            visible: true,
          },
          meanline: {
            visible: true,
          },
          points: 'all',
          jitter: 0.3,
          side: 'both',
          scalemode: 'width',
          line: {
            color: 'gray',
          },
          fillcolor: 'lightblue',
        },
      ] }
      layout={ {
        title: 'Violin Plot of Size',
        yaxis: {
          title: 'Size',
        },
        violingap: 0.2,
        violinmode: 'overlay',
        xaxis: {
          title: 'Index',
          zeroline: true,
        },
        autosize: true, // Makes the plot size adapt to the container
      } }
      useResizeHandler={ true } // Allows resizing when the window/container changes size
      style={ { width: '100%', height: '100%' } } // Style to ensure full width
      />
    </div>
  )
}
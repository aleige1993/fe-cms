export default {
  todayDutyChartsOptions: {
    chart: {
      type: 'variablepie',
      height: 300
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      x: 0,
      y: 0
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
      '<b>{point.x}</b>'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          borderRadius: 5,
          borderWidth: 1,
          y: -6
        }
      }
    },
    series: [{
      type: 'pie',
      innerSize: '40%',
      name: '市场份额',
      data: [
        {
          name: '今日',
          y: 15.0,
          color: '#f6ba4a'
        },
        {
          name: '本周',
          y: 45.0,
          color: '#37bd9c'
        },
        {
          name: '本月',
          y: 60.0,
          color: '#e9573e'
        }
      ]
    }]
  },
  circleProgressOptions: {
    chart: {
      type: 'solidgauge',
      marginTop: 0,
      height: 200
    },
    credits: {
      text: 'hcharts.cn',
      href: 'http://www.hcharts.cn'
    },
    title: {
      text: 'Activity',
      style: {
        fontSize: '24px'
      }
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      shadow: false,
      style: {
        fontSize: '16px'
      },
      pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
      positioner(labelWidth, labelHeight) {
        return {
          x: 200 - labelWidth / 2,
          y: 180
        };
      }
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{ // Track for Move
        outerRadius: '112%',
        innerRadius: '88%',
        backgroundColor: '#fff',
        borderWidth: 0
      }]
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
    },
    plotOptions: {
      solidgauge: {
        borderWidth: '34px',
        dataLabels: {
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false
      }
    },
    series: [{
      name: 'Move',
      borderColor: '#f00',
      data: [{
        color: '#f00',
        radius: '100%',
        innerRadius: '100%',
        y: 80
      }]
    }]
  }
};

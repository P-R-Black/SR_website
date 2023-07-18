const sectNames = document.querySelectorAll('.sect_names');
const pictureTitle = document.querySelector('.sector_title');
const chartTitle = document.querySelector('.yoy_comp_title');
const chartArea = document.getElementById('yoy_chart');
const sectorImage = document.getElementById('sector_image');


const priceEarnings = document.getElementById('price_earnings_forward');
const priceSales = document.getElementById('price_sales_forward');
const priceBook = document.getElementById('price_book_mrq');
const priceCashFlow = document.getElementById('price_cashflow');
const dateCreated = document.getElementById('as_of_date');

var yearAgoPriceEarnings, yearAgoPriceSales, yearAgoPriceBook, yearAgoPriceCashFlow;
var currentPriceEarnings, currentPriceSales, currentPriceBook, currentPriceCashFlow;



// UPDATES SECTOR TITLE ONCE SECTOR IS CHOSEN
const updateTitle = (sector) => {
    if (sector === undefined) {
        sectNames.forEach(sect => {
            sect.addEventListener('click', function(){
                pictureTitle.innerHTML = sect.innerHTML;
                chartTitle.innerHTML = sect.innerHTML;
            })
        })
    } else {
        pictureTitle.innerHTML = sector;
        chartTitle.innerHTML = sector;
    }
   
}

// SETS DEFAULT STATS AND IMAGE ON PAGE LOAD SO THAT DIVS AREN'T EMPTY
const setPicChartStats = () => {
    the_weekly_stats.filter((tats) => {
        if (tats['fields']['sector_name'] == 3){
            pictureTitle.innerHTML = "Communication Services"
            priceEarnings.innerHTML = tats['fields']['forward_pe'] + 'x'
            priceSales.innerHTML = tats['fields']['forward_ps'] + 'x'
            priceBook.innerHTML = tats['fields']['mrq_pb'] + 'x'
            priceCashFlow.innerHTML = tats['fields']['pcf'] + 'x'

            let getDate = tats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            dateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`

           currentPriceEarnings = tats['fields']['forward_pe']
           currentPriceSales = tats['fields']['forward_ps']
           currentPriceBook = tats['fields']['mrq_pb']
           currentPriceCashFlow =  tats['fields']['pcf']
        }
    })

    the_sector_names.filter(image => {
        if (image['pk'] === 3){
            sectorImage.src = 'media/' + image['fields']['sector_image']; 
        }
    })

    the_weekly_y_o_y.filter((tats) => {
        console.log('tats', tats)
        if(tats['fields']['sector_name'] == 3){
            chartTitle.innerHTML = "Communication Services"
            yearAgoPriceEarnings = tats['fields']['forward_pe']
            yearAgoPriceSales = tats['fields']['forward_ps']
            yearAgoPriceBook = tats['fields']['mrq_pb']
            yearAgoPriceCashFlow = tats['fields']['pcf']
        }
    })
}

// PROVIDES SECTOR ID | SECTOR ID IS LINKED TO SECTOR NAME
const getSectorId = () => {
    let sectorInPlay;
    sectNames.forEach(id => {
        id.addEventListener("click", function() {
            let titleID = id.innerHTML
            switch (titleID){
                case "Energy":
                    sectorInPlay = 1;
                    break
                case "Consumer Discretionary":
                    sectorInPlay = 2;
                    break;
                case "Communication Services":
                    sectorInPlay = 3;
                    break
                case "Consumer Staples":
                    sectorInPlay = 4;
                    break
                case "Finance":
                    sectorInPlay = 5;
                    break
                case "Healthcare":
                    sectorInPlay = 6;
                    break
                case "Industrial":
                    sectorInPlay = 7;
                    break
                case "Information Technology":
                    sectorInPlay = 8;
                    break
                case "Materials":
                    sectorInPlay = 9;
                    break
                case "Real Estate":
                    sectorInPlay = 10;
                    break
                case "Utilities":
                    sectorInPlay = 11;
                    break
            }
            statUpdate(sectorInPlay);
            updateImage(sectorInPlay);
            last_years_stats(sectorInPlay)
        })
    })
};

// DISPLAYS SECTOR STATS ON IMAGE WHEN USER SELECTS SECTOR
const statUpdate = (sectorInPlay) => {
    the_weekly_stats.forEach(stats => {
        if (stats['fields']['sector_name'] === sectorInPlay){
            priceEarnings.innerHTML = stats['fields']['forward_pe'] + 'x'
            priceSales.innerHTML = stats['fields']['forward_ps'] + 'x'
            priceBook.innerHTML = stats['fields']['mrq_pb'] + 'x'
            priceCashFlow.innerHTML = stats['fields']['pcf'] + 'x'

            let getDate = stats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            dateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`

            currentPriceEarnings =  stats['fields']['forward_pe']
            currentPriceSales =  stats['fields']['forward_ps']
            currentPriceBook = stats['fields']['mrq_pb']
            currentPriceCashFlow = stats['fields']['pcf']
        }
    })
    the_weekly_y_o_y.forEach(last => {
        if (last['fields']['sector_name'] === sectorInPlay){
            yearAgoPriceEarnings = last['fields']['forward_pe']
            yearAgoPriceSales = last['fields']['forward_ps']
            yearAgoPriceBook = last['fields']['mrq_pb']
            yearAgoPriceCashFlow = last['fields']['pcf']
        }
    })
}

// UPDATES THE IMAGE THAT IS ASSIGNED TO THE SECTOR NAME
const updateImage = (sectorInPlay) => {
    the_sector_names.filter(image => {
        if (image['pk'] === sectorInPlay){
            sectorImage.src = 'media/' + image['fields']['sector_image'];

        }
    })
}

// UPDATES THE IMAGE THAT IS ASSIGNED TO THE INDUSTRY NAME
const indUpdateImage = (industryInPlay) => {
    the_industry_names.filter(image => {
        if (image['pk'] === industryInPlay){
            industryImage.src = 'media/' + image['fields']['sector_image'];

        }
    })
}


// CHANGES SECTOR NAME, STATS, AND IMAGE AFTER 60 SECONDS
const carouselStats = () => {
    let selectedSectorName;
    let lastRandomNum;
    const namesOfSector = [
        {name: 'Communication Services', index: 3}, {name: 'Consumer Discretionary', index: 2},
        {name: 'Consumer Staples', index: 4}, {name: 'Energy', index: 1}, 
        {name: 'Finance', index: 5}, {name: 'Healthcare', index: 6}, {name: 'Industrial', index: 7}, 
        {name: 'Information Technology', index: 8}, {name: 'Materials', index: 9}, 
        {name:'Real Estate', index: 10}, {name: 'Utilities', index: 11}
    ]
    
        const random = Math.floor(Math.random() * namesOfSector.length)
        
        if (lastRandomNum != random){
            namesOfSector.filter(names => {
                if (names.index === random){
                    selectedSectorName = names.name
                }
            })
        } else {
            const random = Math.floor(Math.random() * namesOfSector.length)
        }
       
    updateTitle(selectedSectorName)
    statUpdate(random)
    updateImage(random)
    last_years_stats(random);
    lastRandomNum = random;  
}

const last_years_stats = (sectorInPlay) => {
    const aYearAgoData = [yearAgoPriceEarnings, yearAgoPriceSales, yearAgoPriceBook, yearAgoPriceCashFlow]
    const currData = [currentPriceEarnings, currentPriceSales, currentPriceBook, currentPriceCashFlow]
        const data = {
            labels: ['P/E', 'P/S', 'P/B', 'P/CF'],
            datasets:[{
                label: 'A Year Ago',
                data: aYearAgoData,
                backgroundColor:['rgba(255, 123, 84, 1'],
                borderColor: ['rgba(255, 123, 84, 1)'],
                borderDash: [10],
                borderWidth: 5,
                pointRadius: 5,
                pointStyle: 'triangle'
            },
            {
                label: 'As of Last Week\'s Close ',
                data: currData,
                backgroundColor:['rgba(97, 150, 177, 1)'],
                borderColor: ['rgba(97, 150, 177, 1)'],
                borderWidth: 5,
                pointRadius: 5,
            }]
        };
    
        const legendMargin = {
            id: 'legendMargin',
            beforeInit(chart, legend, options) {
            const fitValue = chart.legend.fit
    
    
            chart.legend.fit = function fit(){
            fitValue.bind(chart.legend)()
                return this.height += 30;
                }
            }
        };
    
        const config = {
            type: 'line',
            data,
            options: {
                maintainAspectRatio: false,
                plugins:{
                    legend: {
                        display: true,
                        fullWidth: true,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'dash',
                            color: 'rgba(0, 0, 0, 0.8)',
                        },
                    },
                },
                scales: {
                    x: {
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.8)',
                        font: {
                            family: 'Libre Caslon Text',
                        }
                    }
                },
                    y: {
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.8)',
                        font: {
                            family: 'Libre Caslon Text',
                        }
                    },
                        beginAtZero: true,
                        afterTickToLabelConversion: (ctx) =>{
                            newTicks = []
                            for (let i = 0; i < ctx.ticks.length; i++){
                                let theVal = ctx.ticks[i]['value']
                                newTicks.push({value: theVal, label: theVal + 'x'})
                            }
                            ctx.ticks = newTicks
        
                        }
                    }
                }
            },
            plugins: [legendMargin]
    
        };
    
        let chartStatus = Chart.getChart('yoy_chart');
        if (chartStatus != undefined) {
            chartStatus.destroy()
        }
        var ctx = new Chart(chartArea, config);
}

window.onload = function() {

    if(window.innerWidth <=600){
        Chart.defaults.font.size = 10;
    } else if (window.innerWidth >= 601 && window.innerWidth <= 1024 ){
        Chart.defaults.font.size = 16;
    } else {
        Chart.defaults.font.size = 22;
    }
    last_years_stats()

}
    
    
    
    setInterval(carouselStats,  35000);
    setPicChartStats()
    updateTitle()
    getSectorId()    
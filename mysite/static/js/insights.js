const sectNames = document.querySelectorAll('.sect_names');
const pictureTitle = document.querySelector('.sector_title');
const sectorImage = document.getElementById('sector_image');

const indNames = document.querySelectorAll('.ind_names');
const indPictureTitle = document.querySelector('.industry_title');
const industryImage = document.getElementById('industry_image');

const chartTitle = document.querySelector('.yoy_comp_title');
const chartArea = document.getElementById('yoy_chart');

const priceEarnings = document.getElementById('price_earnings_forward');
const priceSales = document.getElementById('price_sales_forward');
const priceBook = document.getElementById('price_book_mrq');
const priceCashFlow = document.getElementById('price_cashflow');
const dateCreated = document.getElementById('as_of_date');

const indPriceEarnings = document.getElementById('ind_price_earnings_forward');
const indPriceSales = document.getElementById('ind_price_sales_forward');
const indPriceBook = document.getElementById('ind_price_book_mrq');
const indPriceCashFlow = document.getElementById('ind_price_cashflow');
const indDateCreated = document.getElementById('ind_as_of_date');

var yearAgoPriceEarnings, yearAgoPriceSales, yearAgoPriceBook, yearAgoPriceCashFlow;
var currentPriceEarnings, currentPriceSales, currentPriceBook, currentPriceCashFlow;
var indCurrentPriceEarnings, indCurrentPriceSales, indCurrentPriceBook, indCurrentPriceCashFlow;



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

// UPDATES INDUSTRY TITLE ONCE INDUSTRY IS CHOSEN
const indUpdateTitle = (industry) => {
    if (industry === undefined) {
        indNames.forEach(ind => {
            ind.addEventListener('click', function(){
                indPictureTitle.innerHTML = ind.innerHTML;
                //chartTitle.innerHTML = sect.innerHTML;
            })
        })
    } else {
        indPictureTitle.innerHTML = industry;
        //chartTitle.innerHTML = sector;
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
        if(tats['fields']['sector_name'] == 3){
            chartTitle.innerHTML = "Communication Services"
            yearAgoPriceEarnings = tats['fields']['forward_pe']
            yearAgoPriceSales = tats['fields']['forward_ps']
            yearAgoPriceBook = tats['fields']['mrq_pb']
            yearAgoPriceCashFlow = tats['fields']['pcf']
        }
    })
}

// SETS INDUSTRY DEFAULT STATS AND IMAGE ON PAGE LOAD SO THAT DIVS AREN'T EMPTY
const indSetPicChartStats = () => {
    the_weekly_stats.filter((tats) => {
        console.log('tats', tats )
        if (tats['fields']['industry_name'] == 29){
            indPictureTitle.innerHTML = "Aerospace and Defense"
            indPriceEarnings.innerHTML = tats['fields']['forward_pe'] + 'x'
            indPriceSales.innerHTML = tats['fields']['forward_ps'] + 'x'
            indPriceBook.innerHTML = tats['fields']['mrq_pb'] + 'x'
            indPriceCashFlow.innerHTML = tats['fields']['pcf'] + 'x'

            let getDate = tats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            indDateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`

           indCurrentPriceEarnings = tats['fields']['forward_pe']
           indCurrentPriceSales = tats['fields']['forward_ps']
           indCurrentPriceBook = tats['fields']['mrq_pb']
           indCurrentPriceCashFlow =  tats['fields']['pcf']
        }
    })

    the_industry_names.filter(image => {
        // console.log('image', image)
        if (image['pk'] === 29){
            console.log('image', image)
            industryImage.src = 'media/' + image['fields']['industry_image'];
            console.log('indSetPicChartStats | industryImage.src', industryImage.src)
        }
    })

    // the_weekly_y_o_y.filter((tats) => {
    //     console.log('tats', tats)
    //     if(tats['fields']['sector_name'] == 3){
    //         chartTitle.innerHTML = "Communication Services"
    //         yearAgoPriceEarnings = tats['fields']['forward_pe']
    //         yearAgoPriceSales = tats['fields']['forward_ps']
    //         yearAgoPriceBook = tats['fields']['mrq_pb']
    //         yearAgoPriceCashFlow = tats['fields']['pcf']
    //     }
    // })
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

// PROVIDES SECTOR ID | SECTOR ID IS LINKED TO SECTOR NAME
const getIndustryId = () => {
    let industryInPlay;
    indNames.forEach(id => {
        id.addEventListener("click", function() {
            let titleID = id.innerHTML
            switch (titleID){
                case "Aerospace and Defense":
                    industryInPlay = 29;
                    break
                case "Airlines":
                    industryInPlay = 31;
                    break;
                case "Auto Components":
                    industryInPlay = 55;
                    break
                case "Automobile":
                    industryInPlay = 56;
                    break
                case "Bank Industry":
                    industryInPlay = 20;
                    break
                case "Beverages":
                    industryInPlay = 57;
                    break
                case "Biotechnology":
                    industryInPlay = 24;
                    break
                case "Building Products":
                    industryInPlay = 32;
                    break
                case "Capital Markets":
                    industryInPlay = 21;
                    break
                case "Commercial Services & Supplies":
                    industryInPlay = 33;
                    break
                case "Communication Equipment":
                    industryInPlay = 41;
                    break
                case "Construction & Engineering":
                    industryInPlay = 34;
                    break
                case "Construction Materials":
                    industryInPlay = 48;
                    break
                case "Consumer Finance":
                    industryInPlay = 22;
                    break
                case "Container and Packaging":
                    industryInPlay = 49;
                    break
                case "Diversified Telecom":
                    industryInPlay = 58;
                    break
                case "Diversified Utilities":
                    industryInPlay = 52;
                    break
                case "Electrical Equipment":
                    industryInPlay = 35;
                    break
                case "Electronic Equipment and Instrument Components":
                    industryInPlay = 42;
                    break
                case "Energy Equipment Services":
                    industryInPlay = 18;
                    break
                case "Entertainment":
                    industryInPlay = 59;
                    break
                case "Equity Real Estate":
                    industryInPlay = 51;
                    break
                case "Food Products":
                    industryInPlay = 60;
                    break
                case "Food Staples":
                    industryInPlay = 61;
                    break
                case "Freight & Logistics":
                    industryInPlay = 30;
                    break
                case "Healthcare Equipment Supplies":
                    industryInPlay = 25;
                    break
                case "Healthcare Provider Services":
                    industryInPlay = 26;
                    break
                case "Hotels Restaurants and Leisure":
                    industryInPlay = 62;
                    break
                case "Household Durables":
                    industryInPlay = 63;
                    break
                case "Household Products":
                    industryInPlay = 64;
                    break
                case "Industrial Conglomerates":
                    industryInPlay = 36;
                    break
                case "Information Technology Services":
                    industryInPlay = 43;
                    break
                case "Insurance":
                    industryInPlay = 23;
                    break
                case "Interactive Media":
                    industryInPlay = 65;
                    break
                case "Internet Retail":
                    industryInPlay = 14;
                    break
                case "Life Science Tools and Services":
                    industryInPlay = 27;
                    break
                case "Machinery":
                    industryInPlay = 37;
                    break
                case "Media":
                    industryInPlay = 66;
                    break
                case "Metals and Mining":
                    industryInPlay = 50;
                    break
                case "Multiline Retail":
                    industryInPlay = 15;
                    break
                case "Oil Gas Consumable Fuels":
                    industryInPlay = 19;
                    break
                case "Pharmaceuticals":
                    industryInPlay = 28;
                    break
                case "Professional Services":
                    industryInPlay = 38;
                    break
                case "Regulated Electric":
                    industryInPlay = 53;
                    break
                case "Regulated Gas":
                    industryInPlay = 54;
                    break
                case "Road and Rail":
                    industryInPlay = 39;
                    break
                case "Semiconductors and Semiconductor Equipment":
                    industryInPlay = 44;
                    break
                case "Software":
                    industryInPlay = 45;
                    break
                case "Solar":
                    industryInPlay = 46;
                    break
                case "Specialty Retail":
                    industryInPlay = 16;
                    break
                case "Textiles, Apparel, and Luxury Goods":
                    industryInPlay = 17;
                    break
                case "Tobacco":
                    industryInPlay = 67;
                    break
                case "Trading Companies & Distributors":
                    industryInPlay = 40;
                    break
            }
            indStatUpdate(industryInPlay);
            indUpdateImage(industryInPlay);
            //last_years_stats(industryInPlay)
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

// DISPLAYS INDUSTRY STATS ON IMAGE WHEN USER SELECTS INDUSTRY
const indStatUpdate = (industryInPlay) => {
    the_weekly_stats.forEach(stats => {
        if (stats['fields']['sector_name'] === industryInPlay){
            indPriceEarnings.innerHTML = stats['fields']['forward_pe'] + 'x'
            indPriceSales.innerHTML = stats['fields']['forward_ps'] + 'x'
            indPriceBook.innerHTML = stats['fields']['mrq_pb'] + 'x'
            indPriceCashFlow.innerHTML = stats['fields']['pcf'] + 'x'

            let getDate = stats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            indDateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`

            indCurrentPriceEarnings =  stats['fields']['forward_pe']
            indCurrentPriceSales =  stats['fields']['forward_ps']
            indCurrentPriceBook = stats['fields']['mrq_pb']
            indCurrentPriceCashFlow = stats['fields']['pcf']
        }
    })
    // the_weekly_y_o_y.forEach(last => {
    //     if (last['fields']['sector_name'] === sectorInPlay){
    //         yearAgoPriceEarnings = last['fields']['forward_pe']
    //         yearAgoPriceSales = last['fields']['forward_ps']
    //         yearAgoPriceBook = last['fields']['mrq_pb']
    //         yearAgoPriceCashFlow = last['fields']['pcf']
    //     }
    // })
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
            industryImage.src = 'media/' + image['fields']['industry_image'];

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
    indSetPicChartStats()

    updateTitle()
    indUpdateTitle()

    getSectorId()
    getIndustryId()
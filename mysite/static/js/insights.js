const sectNames = document.querySelectorAll('.sect_names');
const pictureTitle = document.querySelector('.sector_title');
const sectorImage = document.getElementById('sector_image');

const indNames = document.querySelectorAll('.select_industry');
const indPictureTitle = document.querySelector('.industry_title');
const industryImage = document.getElementById('industry_image');

const chartTitle = document.querySelector('.yoy_comp_title');
const chartArea = document.getElementById('yoy_chart');

const indChartTitle = document.querySelector('.ind_yoy_comp_title');
const indChartArea = document.getElementById('ind_yoy_chart');

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

var indYearAgoPriceEarnings, indYearAgoPriceSales, indYearAgoPriceBook, indYearAgoPriceCashFlow;
var indCurrentPriceEarnings, indCurrentPriceSales, indCurrentPriceBook, indCurrentPriceCashFlow;

const industrySelector = document.querySelectorAll('.show_industry')

const serviceSector = document.querySelector('.services_sector')
const serviceSectorContainer = document.querySelector('.services_sector_container')

const discretionarySector = document.querySelector('.discretionary_sector')
const discretionarySectorContainer = document.querySelector('.discretionary_sector_container')

const consumerStaplesSector = document.querySelector('.staples_sector')
const consumerStaplesSectorContainer = document.querySelector('.staples_sector_container')

const energySector = document.querySelector('.energy_sector')
const energySectorContainer = document.querySelector('.energy_sector_container')

const financeSector = document.querySelector('.finance_sector')
const financeSectorContainer = document.querySelector('.finance_sector_container')

const healthCareSector = document.querySelector('.healthcare_sector')
const healthCareSectorContainer = document.querySelector('.healthcare_sector_container')

const industrialSector = document.querySelector('.industrial_sector')
const industrialSectorContainer = document.querySelector('.industrial_sector_container')

const technologySector = document.querySelector('.technology_sector')
const technologySectorContainer = document.querySelector('.technology_sector_container')

const materialsSector = document.querySelector('.materials_sector')
const materialsSectorContainer = document.querySelector('.materials_sector_container')

const realEstateSector = document.querySelector('.estate_sector')
const realEstateSectorContainer = document.querySelector('.estate_sector_container')

const utilitiesSector = document.querySelector('.utilities_sector')
const utilitiesSectorContainer = document.querySelector('.utilities_sector_container')

const industrySelectorTwo = document.querySelectorAll('.show_industry_two')

// Industry Y-o-Y Box  .select_industry_two
const indNamesTwo = document.querySelectorAll('.select_industry_two');

const serviceSectorTwo = document.querySelector('.services_sector_two')
const serviceSectorContainerTwo = document.querySelector('.services_sector_container_two')

const discretionarySectorTwo = document.querySelector('.discretionary_sector_two')
const discretionarySectorContainerTwo = document.querySelector('.discretionary_sector_container_two')

const consumerStaplesSectorTwo = document.querySelector('.staples_sector_two')
const consumerStaplesSectorContainerTwo = document.querySelector('.staples_sector_container_two')

const energySectorTwo = document.querySelector('.energy_sector_two')
const energySectorContainerTwo = document.querySelector('.energy_sector_container_two')

const financeSectorTwo = document.querySelector('.finance_sector_two')
const financeSectorContainerTwo = document.querySelector('.finance_sector_container_two')

const healthCareSectorTwo = document.querySelector('.healthcare_sector_two')
const healthCareSectorContainerTwo = document.querySelector('.healthcare_sector_container_two')

const industrialSectorTwo = document.querySelector('.industrial_sector_two')
const industrialSectorContainerTwo = document.querySelector('.industrial_sector_container_two')

const technologySectorTwo = document.querySelector('.technology_sector_two')
const technologySectorContainerTwo = document.querySelector('.technology_sector_container_two')

const materialsSectorTwo = document.querySelector('.materials_sector_two')
const materialsSectorContainerTwo = document.querySelector('.materials_sector_container_two')

const realEstateSectorTwo = document.querySelector('.estate_sector_two')
const realEstateSectorContainerTwo = document.querySelector('.estate_sector_container_two')

const utilitiesSectorTwo = document.querySelector('.utilities_sector_two')
const utilitiesSectorContainerTwo = document.querySelector('.utilities_sector_container_two')


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
                indChartTitle.innerHTML = ind.innerHTML;
            })
        })
    } else {
        indPictureTitle.innerHTML = industry;
        indChartTitle.innerHTML = industry;
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
            // production code: sectorImage.src = 'https://sevtestbucket.s3.amazonaws.com/media/' + image['fields']['sector_image']; 
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
        if (image['pk'] === 29){
            industryImage.src = 'media/' + image['fields']['industry_image'];
            //production code: industryImage.src = 'https://sevtestbucket.s3.amazonaws.com/media/' + image['fields']['industry_image'];
        }
    })

    the_weekly_y_o_y.filter((tats) => {
        if(tats['fields']['industry_name'] == 29){
            indChartTitle.innerHTML = "Aerospace and Defense"
            indYearAgoPriceEarnings = tats['fields']['forward_pe']
            indYearAgoPriceSales = tats['fields']['forward_ps']
            indYearAgoPriceBook = tats['fields']['mrq_pb']
            indYearAgoPriceCashFlow = tats['fields']['pcf']
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
                case "Chemicals":
                    industryInPlay = 47;
                    break
                case "Commercial Services and Supplies":
                    industryInPlay = 33;
                    break
                case "Communication Equipment":
                    industryInPlay = 41;
                    break
                case "Construction and Engineering":
                    industryInPlay = 34;
                    break
                case "Construction Materials":
                    industryInPlay = 48;
                    break
                case "Consumer Finance":
                    industryInPlay = 22;
                    break
                case "Containers and Packaging":
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
                case "Freight and Logistics":
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
                case "Specialty Retail":
                    industryInPlay = 16;
                    break
                case "Textiles, Apparel, and Luxury Goods":
                    industryInPlay = 17;
                    break
                case "Trading Companies and Distributors":
                    industryInPlay = 40;
                    break
            }
            indStatUpdate(industryInPlay);
            indUpdateImage(industryInPlay);
            ind_last_years_stats(industryInPlay)
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
        if (stats['fields']['industry_name'] === industryInPlay){
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
    the_weekly_y_o_y.forEach(last => {
        if (last['fields']['industry_name'] === industryInPlay){
            indYearAgoPriceEarnings = last['fields']['forward_pe']
            indYearAgoPriceSales = last['fields']['forward_ps']
            indYearAgoPriceBook = last['fields']['mrq_pb']
            indYearAgoPriceCashFlow = last['fields']['pcf']
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

// CHANGES INDUSTRY NAME, STATS, AND IMAGE AFTER 60 SECONDS
const indCarouselStats = () => {
    let selectedIndustryName;
    const namesOfIndustry = [
        {name: 'Aerospace and Defense', index: 29}, {name: 'Airlines', index: 31}, 
        {name: 'Auto Components', index: 55}, {name: 'Automobile', index: 56}, {name: 'Bank Industry', index: 20},
        {name: 'Beverages', index: 57}, {name: 'Biotechnology', index: 24}, {name: 'Building Products', index: 32},
        {name: 'Capital Markets', index: 21}, {name: 'Chemicals', index: 47},
        {name: 'Commercial Services and Supplies', index: 33}, {name: 'Communication Equipment', index: 41}, 
        {name: 'Construction Materials', index: 48}, {name: 'Construction and Engineering', index: 34},
        {name: 'Consumer Finance', index: 22}, {name: 'Containers and Packaging', index: 49}, 
        {name: 'Diversified Telecom', index: 58}, {name: 'Diversified Utilities', index: 52}, {name: 'Electrical Equipment', index: 35}, 
        {name: 'Electronic Equipment and Instrument Components', index: 42}, {name: 'Energy Equipment Services', index: 18}, 
        {name: 'Entertainment', index: 59}, {name: 'Equity Real Estate', index: 51},
        {name: 'Food Products', index: 60}, {name: 'Food Staples', index: 61},
        {name: 'Freight and Logistics', index: 30}, {name: 'Healthcare Equipment Supplies', index: 25}, 
        {name: 'Healthcare Provider Services', index: 26}, {name: 'Hotels Restaurants and Leisure', index: 62}, 
        {name: 'Household Durables', index: 63}, {name: 'Household Products', index: 64}, 
        {name: 'Industrial Conglomerates', index: 36}, 
        {name:'Information Technology Services', index: 43}, {name: 'Insurance', index: 23},
        {name: 'Interactive Media', index: 65}, {name: 'Internet Retail', index: 14},
        {name: 'Life Science Tools and Services', index: 27}, {name: 'Machinery', index: 37}, 
        {name: 'Media', index: 66}, {name: 'Metals and Mining', index: 50}, {name: 'Multiline Retail', index: 15}, 
        {name: 'Oil Gas Consumable Fuels', index: 19}, {name: 'Pharmaceuticals', index: 28}, 
        {name: 'Professional Services', index: 38}, {name: 'Regulated Electric', index: 53},
        {name: 'Regulated Gas', index: 54}, {name: 'Road and Rail', index: 39},
        {name: 'Semiconductors and Semiconductor Equipment', index: 44}, {name: 'Software', index: 45}, 
        {name: 'Finance', index: 5}, {name: 'Healthcare', index: 6}, {name: 'Industrial', index: 7}, 
        {name: 'Specialty Retail', index: 16}, {name: 'Textiles, Apparel, and Luxury Goods', index: 17},
        {name: 'Trading Companies and Distributors', index: 40},

    ]
        const random = Math.floor(Math.random() * namesOfIndustry.length)
        let lastRandomNum;
        
        if (lastRandomNum != random){
            namesOfIndustry.filter(names => {
                if (names.index === random){
                    selectedIndustryName = names.name
                }
            })
        } else {
            const random = Math.floor(Math.random() * namesOfIndustry.length)
        }
        lastRandomNum = random;
       
    indUpdateTitle(selectedIndustryName)
    indStatUpdate(random)
    indUpdateImage(random)
    ind_last_years_stats(random);
    
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


// Industry Y-o-Y
const ind_last_years_stats = (industryInPlay) => {
    const aYearAgoData = [indYearAgoPriceEarnings, indYearAgoPriceSales, indYearAgoPriceBook, indYearAgoPriceCashFlow]
    const currData = [indCurrentPriceEarnings, indCurrentPriceSales, indCurrentPriceBook, indCurrentPriceCashFlow]
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
    
        let chartStatus = Chart.getChart('ind_yoy_chart');
        if (chartStatus != undefined) {
            chartStatus.destroy()
        }
        var ctx = new Chart(indChartArea, config);
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
    ind_last_years_stats()
}
    
// OPEN AND CLOSE INDUSTRY SELECTOR
const openCloseIndustryModal = () => {
    serviceSector.addEventListener('click', () =>{
        serviceSectorContainer.classList.toggle('show')
    })

    discretionarySector.addEventListener('click', () =>{
        discretionarySectorContainer.classList.toggle('show')
    })

    consumerStaplesSector.addEventListener('click', () =>{
        consumerStaplesSectorContainer.classList.toggle('show')
    })

    energySector.addEventListener('click', () =>{
        energySectorContainer.classList.toggle('show')
    })

    financeSector.addEventListener('click', () =>{
        financeSectorContainer.classList.toggle('show')
    })

    healthCareSector.addEventListener('click', () =>{
        healthCareSectorContainer.classList.toggle('show')
    })

    industrialSector.addEventListener('click', () =>{
        industrialSectorContainer.classList.toggle('show')
    })

    technologySector.addEventListener('click', () =>{
        technologySectorContainer.classList.toggle('show')
    })

    materialsSector.addEventListener('click', () =>{
        materialsSectorContainer.classList.toggle('show')
    })

    realEstateSector.addEventListener('click', () =>{
        realEstateSectorContainer.classList.toggle('show')
    })

    utilitiesSector.addEventListener('click', () =>{
        utilitiesSectorContainer.classList.toggle('show')
    })


    serviceSectorTwo.addEventListener('click', () =>{
        serviceSectorContainerTwo.classList.toggle('show')
    })

    discretionarySectorTwo.addEventListener('click', () =>{
        discretionarySectorContainerTwo.classList.toggle('show')
    })

    consumerStaplesSectorTwo.addEventListener('click', () =>{
        consumerStaplesSectorContainerTwo.classList.toggle('show')
    })

    energySectorTwo.addEventListener('click', () =>{
        energySectorContainerTwo.classList.toggle('show')
    })

    financeSectorTwo.addEventListener('click', () =>{
        financeSectorContainerTwo.classList.toggle('show')
    })

    healthCareSectorTwo.addEventListener('click', () =>{
        healthCareSectorContainerTwo.classList.toggle('show')
    })

    industrialSectorTwo.addEventListener('click', () =>{
        industrialSectorContainerTwo.classList.toggle('show')
    })

    technologySectorTwo.addEventListener('click', () =>{
        technologySectorContainerTwo.classList.toggle('show')
    })

    materialsSectorTwo.addEventListener('click', () =>{
        materialsSectorContainerTwo.classList.toggle('show')
    })

    realEstateSectorTwo.addEventListener('click', () =>{
        realEstateSectorContainerTwo.classList.toggle('show')
    })

    utilitiesSectorTwo.addEventListener('click', () =>{
        utilitiesSectorContainerTwo.classList.toggle('show')
    })

}

    
    
    setInterval(carouselStats,  35000);
    setInterval(indCarouselStats, 35000)
    

    setPicChartStats()
    indSetPicChartStats()

    updateTitle()
    indUpdateTitle()

    getSectorId()
    getIndustryId()

    openCloseIndustryModal()

  
    // const namesOfIndustry = [
    //     {name: 'Aerospace and Defense', index: 55}, {name: 'Airlines', index: 58}, {name: 'Auto Components', index: 59}, 
    //     {name: 'Automobile', index: 61}, {name: 'Bank Industry', index: 62}, {name: 'Beverages', index: 73}, {name: 'Biotechnology', index: 83}, 
    //     {name: 'Building Products', index: 89}, {name: 'Capital Markets', index: 80}, {name: 'Chemicals', index: 113}, 
    //     {name: 'Commercial Services and Supplies', index: 90}, {name: 'Communication Equipment', index: 91}, {name: 'Construction Materials', index: 104}, 
    //     {name: 'Construction and Engineering', index: 92}, {name: 'Consumer Finance', index: 81}, {name: 'Containers and Packaging', index: 105}, 
    //     {name: 'Diversified Telecom', index: 63}, {name: 'Diversified Utilities', index: 108}, {name: 'Electrical Equipment', index: 93}, 
    //     {name: 'Electronic Equipment and Instrument Components', index: 99}, {name: 'Energy Equipment Services', index: 78}, 
    //     {name: 'Entertainment', index: 64}, {name: 'Equity Real Estate', index: 107}, {name: 'Food Products', index: 74}, 
    //     {name: 'Food Staples', index: 75}, {name: 'Freight and Logistics', index: 94}, {name: 'Healthcare Equipment Supplies', index: 84},
    //     {name: 'Healthcare Provider Services', index: 85}, {name: 'Hotels Restaurants and Leisure', index: 67}, {name: 'Household Durables', index: 68}, 
    //     {name: 'Household Products', index: 76}, {name: 'Industrial Conglomerates', index: 95}, {name: 'Information Technology Services', index: 100}, 
    //     {name: 'Insurance', index: 82}, {name: 'Interactive Media', index: 65}, {name: 'Internet Retail', index: 69}, 
    //     {name: 'Life Science Tools and Services', index: 86}, {name: 'Machinery', index: 96}, {name: 'Media', index: 66}, 
    //     {name: 'Metals and Mining', index: 106}, {name: 'Multiline Retail', index: 70}, {name: 'Oil Gas Consumable Fuels', index: 79}, 
    //     {name: 'Pharmaceuticals', index: 87}, {name: 'Professional Services', index: 97}, {name: 'Regulated Electric', index: 109}, {name: 'Regulated Gas', index: 110}, {name: 'Road and Rail', index: 98}, {name: 'Semiconductors and Semiconductor Equipment', index: 101}, 
    //     {name: 'Software', index: 102},  {name: 'Specialty Retail', index: 71}, {name: 'Textiles, Apparel, and Luxury Goods', index: 72},
    //     {name: 'Trading Companies and Distributors', index: 111},
    // ]

    // PROVIDES INDUSTRY ID | INDSUTRY ID IS LINKED TO INDUSTRY NAME
// const getIndustryId = () => {
//     let industryInPlay;
//     indNames.forEach(id => {
//         id.addEventListener("click", function() {
//             let titleID = id.innerHTML
//             switch (titleID){
//                 case "Aerospace and Defense":
//                     industryInPlay = 55;
//                     break
//                 case "Airlines":
//                     industryInPlay = 58;
//                     break;
//                 case "Auto Components":
//                     industryInPlay = 59;
//                     break
//                 case "Automobile":
//                     industryInPlay = 61;
//                     break
//                 case "Bank Industry":
//                     industryInPlay = 62;
//                     break
//                 case "Beverages":
//                     industryInPlay = 73;
//                     break
//                 case "Biotechnology":
//                     industryInPlay = 83;
//                     break
//                 case "Building Products":
//                     industryInPlay = 89;
//                     break
//                 case "Capital Markets":
//                     industryInPlay = 80;
//                     break
//                 case "Chemicals":
//                     industryInPlay = 113;
//                     break
//                 case "Commercial Services and Supplies":
//                     industryInPlay = 90;
//                     break
//                 case "Communication Equipment":
//                     industryInPlay = 91;
//                     break
//                 case "Construction and Engineering":
//                     industryInPlay = 92;
//                     break
//                 case "Construction Materials":
//                     industryInPlay = 104;
//                     break
//                 case "Consumer Finance":
//                     industryInPlay = 81;
//                     break
//                 case "Container and Packaging":
//                     industryInPlay = 105;
//                     break
//                 case "Diversified Telecom":
//                     industryInPlay = 63;
//                     break
//                 case "Diversified Utilities":
//                     industryInPlay = 108;
//                     break
//                 case "Electrical Equipment":
//                     industryInPlay = 93;
//                     break
//                 case "Electronic Equipment and Instrument Components":
//                     industryInPlay = 99;
//                     break
//                 case "Energy Equipment Services":
//                     industryInPlay = 78;
//                     break
//                 case "Entertainment":
//                     industryInPlay = 64;
//                     break
//                 case "Equity Real Estate":
//                     industryInPlay = 107;
//                     break
//                 case "Food Products":
//                     industryInPlay = 74;
//                     break
//                 case "Food Staples":
//                     industryInPlay = 75;
//                     break
//                 case "Freight and Logistics":
//                     industryInPlay = 94;
//                     break
//                 case "Healthcare Equipment Supplies":
//                     industryInPlay = 84;
//                     break
//                 case "Healthcare Provider Services":
//                     industryInPlay = 85;
//                     break
//                 case "Hotels Restaurants and Leisure":
//                     industryInPlay = 67;
//                     break
//                 case "Household Durables":
//                     industryInPlay = 68;
//                     break
//                 case "Household Products":
//                     industryInPlay = 76;
//                     break
//                 case "Industrial Conglomerates":
//                     industryInPlay = 95;
//                     break
//                 case "Information Technology Services":
//                     industryInPlay = 100;
//                     break
//                 case "Insurance":
//                     industryInPlay = 82;
//                     break
//                 case "Interactive Media":
//                     industryInPlay = 65;
//                     break
//                 case "Internet Retail":
//                     industryInPlay = 69;
//                     break
//                 case "Life Science Tools and Services":
//                     industryInPlay = 86;
//                     break
//                 case "Machinery":
//                     industryInPlay = 96;
//                     break
//                 case "Materials":
//                     industryInPlay = 103;
//                     break
//                 case "Media":
//                     industryInPlay = 66;
//                     break
//                 case "Metals and Mining":
//                     industryInPlay = 106;
//                     break
//                 case "Multiline Retail":
//                     industryInPlay = 70;
//                     break
//                 case "Oil Gas Consumable Fuels":
//                     industryInPlay = 79;
//                     break
//                 case "Pharmaceuticals":
//                     industryInPlay = 87;
//                     break
//                 case "Professional Services":
//                     industryInPlay = 97;
//                     break
//                 case "Regulated Electric":
//                     industryInPlay = 109;
//                     break
//                 case "Regulated Gas":
//                     industryInPlay = 110;
//                     break
//                 case "Road and Rail":
//                     industryInPlay = 98;
//                     break
//                 case "Semiconductors and Semiconductor Equipment":
//                     industryInPlay = 101;
//                     break
//                 case "Software":
//                     industryInPlay = 102;
//                     break
//                 case "Specialty Retail":
//                     industryInPlay = 71;
//                     break
//                 case "Textiles, Apparel, and Luxury Goods":
//                     industryInPlay = 72;
//                     break
//                 case "Trading Companies and Distributors":
//                     industryInPlay = 111;
//                     break
//             }
//             indStatUpdate(industryInPlay);
//             indUpdateImage(industryInPlay);
//             //last_years_stats(industryInPlay)
//         })
//     })
// };

// energy
// this p/e 12.16  p/b 3.77
// last p/e 14.63x p/b 2.39

// industrial
// this p/e 28.62  p/b 5.98
// last p/e 42.08x p/b 5.73
from django.core.management.base import BaseCommand
import pandas as pd
from insightsTwo.models import SectorName, WeeklyStats, IndustryName
import sqlite3
from django.core import serializers
import json

class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        conn = sqlite3.connect('/Users/paulblack/PycharmProjects/StatScanner/SP500Stats/sector_industry.db')
        curs = conn.cursor()
        sector_names = [
            'comm_services', 'con_stapes', 'cons_disc', 'energy', 'finance_sect',
            'healthcare_sect', 'industrial_sect', 'info_technology', 'materials', 
            'real_estate_sect', 'utilities', 'sp_500',]
        
        sector_dict = {'SP500 Communication Serv Mean': 3, 'Consumer Staples Mean': 4, 'Consumer Disc Mean': 2,
                'SP500 Energy Mean': 1, 'Finance Sector Mean': 5, 'SP500 Health Care Mean': 6,
                'Industrial Sector Mean': 7, 'SP500 IT Mean': 8, 'SP500 Materials Mean': 9,
                'SP500 Real Estate Mean': 10, 'SP500 Utilities Mean': 11, 'S&P 500 Mean':13,}
        
        industry_names = [
            'Aerospace and Defense','Airlines','Auto Components', 'Automobile', 'Bank Industry', 'Beverages', 
            'Biotechnology', 'Building Products', 'Capital Markets', 'Chemicals', 'Commercial Servives & Supplies', 
            'Communication Equipment', 'Construction & Engineering', 'Construction Materials', 'Consumer Finance', 
            'Containers and Packaging', 'Diversified Telecom', 'Diversified Utilities', 'Electrical Equipment', 
            'Electronic Equipment and Instrument Components', 'Energy Equipment Services', 'Entertainment', 
            'Equity Real Estate', 'Food Products', 'Food Staples', 'Freight & Logistics', 'Healthcare Equipment Supplies', 
            'Healthcare Provider Services', 'Hotels Restaurants and Leisure', 'Household Durables', 'Household Products', 
            'Industrial Conglomerates', 'Information Technology Services', 'Insurance', 'Interactive Media', 'Internet Retail', 
            'Life Science Tools and Services', 'Machinery', 'Media', 'Metals and Mining', 'Multiline Retail', 
            'Oil Gas Consumable Fuels', 'Pharmaceuticals', 'Professional Services', 'Regulated Electric', 
            'Regulated Gas', 'Road and Rail', 'Semiconductors and Semiconductor Equipment', 'Software', 'Solar', 
            'Specialty Retail', 'Textiles, Apparel, and Luxury Goods', 'Tobacco', 'Trading Companies & Distributors'
            ]

        industry_dict = {
            'Aerospace and Defense': 29, 'Airlines': 31, 'Auto Components': 55, 'Automobile': 56, 
            'Bank Industry': 20, 'Beverages': 57, 'Biotechnology': 24, 'Building Products': 32, 
            'Capital Markets': 21, 'Chemicals': 47, 'Commercial Servives & Supplies': 33, 
            'Communication Equipment': 41, 'Construction & Engineering': 34, 'Construction Materials': 48, 
            'Consumer Finance': 22, 'Containers and Packaging': 49, 'Diversified Telecom': 58, 
            'Diversified Utilities': 52, 'Electrical Equipment': 35, 'Electronic Equipment and Instrument Components': 42, 
            'Energy Equipment Services': 18, 'Entertainment': 59, 'Equity Real Estate': 51, 'Food Products': 60, 
            'Food Staples': 61, 'Freight & Logistics': 30, 'Healthcare Equipment Supplies': 25, 
            'Healthcare Provider Services': 26, 'Hotels Restaurants and Leisure': 62, 'Household Durables': 63, 
            'Household Products': 64, 'Industrial Conglomerates': 36, 'Information Technology Services': 43,
            'Insurance': 23, 'Interactive Media': 65, 'Internet Retail': 14, 'Life Science Tools and Services': 27, 
            'Machinery': 37,'Media': 66, 'Metals and Mining': 50, 'Multiline Retail': 15, 'Oil Gas Consumable Fuels': 19, 
            'Pharmaceuticals': 28, 'Professional Services': 38, 'Regulated Electric': 53, 'Regulated Gas': 54, 
            'Road and Rail': 39, 'Semiconductors and Semiconductor Equipment': 44, 'Software': 45, 'Solar': 46, 
            'Specialty Retail': 16, 'Textiles, Apparel, and Luxury Goods': 17, 'Tobacco': 67, 
            'Trading Companies & Distributors': 40
            }
        
        
        stats_list = []
        try:
            for i in sector_names:
                curs.execute(f"SELECT symbol, Price, \"Forward P/E\", \"Trailing P/E\", \"Forward Price/Sales\","
                            f"\"Price/Sales (ttm)\", \"Price/Book (mrq)\", \"Price/CashFlow\", "
                            f"\"Quick Ratio\", \"Current Ratio\", \"Total Debt to Equity (mrq)\", "
                            f"\"Total Debt to Capital\", \"Return on Equity\", \"Return on Assets\","
                            f"\"Return on Invested Capital (ttm)\", \"Book Value/Market Value\","
                            f"\"Asset Turnover\", \"Inventory Turnover (ttm)\", \"Operating Margin\","
                            f"\"Profit Margin\", \"Gross Margin ttm\","
                            f"\"Enterprise Value/Revenue\", \"Enterprise Value/EBITDA\", "
                            f"\"Date\" FROM {i} ORDER BY Date DESC LIMIT 1")
                stats_list.append(curs.fetchone())
        except Exception as e:
            print(e)

      

        # sec_name = SectorName.objects.all()
        # weekly_stats = serializers.serialize('json', WeeklyStats.objects.all())
        # get_weekly_stats = json.loads(weekly_stats)
        
        # db_sector_name = set()
        # new_list_of_dates = list()
        # for gw in get_weekly_stats:
        #     if "2023" in gw['fields']['date_created'][:10]:
        #         db_sector_name = (str(gw['fields']['sector_name']), str(gw['fields']['date_created'][:10]))
        #         new_list_of_dates.append(db_sector_name)

        # pks_new_list = list()
        # for i in get_weekly_stats:
        #     all_sector_numbers = i['fields']['sector_name']
        #     if all_sector_numbers not in pks_new_list:
        #         pks_new_list.append(all_sector_numbers)

        # pk_num = 0
        # pk_name =""
        
        # while len(pks_new_list) > 0:
        #     for i in pks_new_list:
        #         pk_num = i

        #     print('i', pk_num)
        #     for v in sector_dict.keys():
        #         if sector_dict[v] == pk_num:
        #             pk_name = v
            

        #     target_stat = ()
        #     for stats in stats_list:
        #         if stats[0] == pk_name:
        #             target_stat = stats

            
        #     the_price = target_stat[1]
        #     the_forward_pe = target_stat[2]
        #     the_trailing_pe = target_stat[3]
        #     the_forward_ps = target_stat[4]
        #     the_trailing_ps = target_stat[5]
        #     the_mrq_pb = target_stat[6]
        #     the_price_to_cash = target_stat[7]
        #     the_quick_ratio = target_stat[8]
        #     the_current_ratio = target_stat[9]
        #     the_total_debt_to_eq = target_stat[10]
        #     the_total_debt_to_cap = target_stat[11]
        #     the_roe =  target_stat[12]
        #     the_roa = target_stat[13]
        #     the_roic = target_stat[14]
        #     the_bv_mv = target_stat[15]
        #     the_ass_turnover = target_stat[16]
        #     the_inv_turnover = target_stat[17]
        #     the_op_margin = target_stat[18]
        #     the_prof_margin = target_stat[19]
        #     the_gross_margin = target_stat[20]
        #     the_ev_rev = target_stat[21]
        #     the_ev_ebitda = target_stat[22]
        #     the_date = target_stat[23]
        #     print('the_date', the_date[:10])

        #     check_for_previous_entry = (str(pk_num), str(the_date[:10]))
        #     print('check_for_previous_entry', check_for_previous_entry)

        #     if check_for_previous_entry in new_list_of_dates:
        #         print(f'Need to pass, {pk_name} at {the_date[:10]} already on file')
        #         pass
        #     else:
        #         print(f'Need to Update, {pk_name} for {the_date[:10]} not on file')
        #         models = WeeklyStats(sector_name=SectorName.objects.get(pk=pk_num), price=target_stat[1], forward_pe=target_stat[2], 
        #                             trailing_pe=target_stat[3], forward_ps=target_stat[4], trailing_ps=target_stat[5], 
        #                             mrq_pb=target_stat[6], pcf=target_stat[7], quick_ratio=target_stat[8], 
        #                             current_ratio=target_stat[9], total_debt_to_equity=target_stat[10], 
        #                             total_debt_to_capital=target_stat[11], roe=target_stat[12], roa=target_stat[12], 
        #                             roic=target_stat[14], bv_mv=target_stat[15], ass_turnover=target_stat[16], 
        #                             inv_trnover=target_stat[17], op_margin=target_stat[18], prof_margin=target_stat[19], 
        #                             gross_margin=target_stat[20], ev_revenue=target_stat[21], ev_ebitda=target_stat[22], 
        #                             date_created=target_stat[23])
        #         models.save()
        #     pks_new_list.remove(pk_num)

       
    
        
        """
        Adding data from CSV to Database  
        """
        # sector_dict = {'SP500 Communication Serv Mean': 3, 'Consumer Staples Mean': 4, 'Consumer Disc Mean': 2,
        # 'SP500 Energy Mean': 1, 'Finance Sector Mean': 5, 'SP500 Health Care Mean': 6,
        # 'Industrial Sector Mean': 7, 'SP500 IT Mean': 8, 'SP500 Materials Mean': 9,
        # 'SP500 Real Estate Mean': 10, 'SP500 Utilities Mean': 11, 'S&P 500 Mean':13,}

        pk_num = 7
        sec_name = SectorName.objects.get(pk=pk_num)

        ind_num = 40
        indus_name = IndustryName.objects.get(pk=ind_num)
        

        df = pd.read_csv('trading_companies_distr.csv')
        df.replace("nan", 0.00)
        trav_file = df.T
        the_price = trav_file.loc['Price']
        the_forward_pe = trav_file.loc['Forward P/E']
        the_trailing_pe = trav_file.loc['Trailing P/E']
        the_forward_ps = trav_file.loc['Forward Price/Sales']
        the_trailing_ps = trav_file.loc['Price/Sales (ttm)']
        the_mrq_pb = trav_file.loc['Price/Book (mrq)']
        the_price_to_cash = trav_file.loc['Price/CashFlow']
        the_quick_ratio = trav_file.loc['Quick Ratio']
        the_current_ratio = trav_file.loc['Current Ratio']
        the_total_debt_to_eq = trav_file.loc['Total Debt to Equity (mrq)']
        the_total_debt_to_cap = trav_file.loc['Total Debt to Capital']
        the_roe = trav_file.loc['Return on Equity']
        the_roa = trav_file.loc['Return on Assets']
        the_roic = trav_file.loc['Return on Invested Capital (ttm)']
        the_bv_mv = trav_file.loc['Book Value/Market Value']
        the_ass_turnover = trav_file.loc['Asset Turnover']
        the_inv_turnover = trav_file.loc['Inventory Turnover (ttm)']
        the_op_margin = trav_file.loc['Operating Margin']
        the_prof_margin = trav_file.loc['Profit Margin']
        the_gross_margin = trav_file.loc['Gross Margin ttm']
        the_ev_rev = trav_file.loc['Enterprise Value/Revenue']
        the_ev_ebitda = trav_file.loc['Enterprise Value/EBITDA']
        the_date = trav_file.loc['Date']



        for a, b, c, d, e, f, g, h, i, j, k, l ,m, n, o, p, q, r, s, t, u, v, w in zip(the_price, the_forward_pe, 
                                                                                       the_trailing_pe, the_forward_ps,
                                                                                       the_trailing_ps, the_mrq_pb,
                                                                                       the_price_to_cash, the_quick_ratio, 
                                                                                       the_current_ratio, the_total_debt_to_eq,
                                                                                       the_total_debt_to_cap, the_roe, 
                                                                                       the_roa, the_roic, the_bv_mv, 
                                                                                       the_ass_turnover, the_inv_turnover,
                                                                                       the_op_margin, the_prof_margin, 
                                                                                       the_gross_margin, the_ev_rev, 
                                                                                       the_ev_ebitda, the_date):
            
            new_d = str(d).replace('nan', '0.00')
            d = float(new_d)
            models = WeeklyStats(
                industry_name=IndustryName.objects.get(pk=ind_num), sector_name_id=pk_num, 
                price=a, forward_pe=b, trailing_pe=c, forward_ps=d, trailing_ps=e, mrq_pb=f, pcf=g, quick_ratio=h, 
                current_ratio=i, total_debt_to_equity=j, total_debt_to_capital=k, roe=l, roa=m, roic=n, bv_mv=o, 
                ass_turnover=p, inv_trnover=q, op_margin=r, prof_margin=s, gross_margin=t, ev_revenue=u, ev_ebitda=v, 
                date_created=w)
            models.save()
            print('indus_name', indus_name)


   
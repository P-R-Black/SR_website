from django.shortcuts import render, redirect
from insightsTwo.models import SectorName, WeeklyStats, IndustryName
import json
from django.http import JsonResponse
from django.core import serializers
from django.core.cache import cache

# Create your views here.
def insights_two_home(request):
    
    the_sector = SectorName.objects.all()
    the_industry = IndustryName.objects.all()
    the_stats = WeeklyStats.objects.all()[:12]
    the_stats_a_year_ago = WeeklyStats.objects.all()[625:637]

    the_weekly_stats = serializers.serialize('json', the_stats)
    the_sector_names = serializers.serialize('json', the_sector)
    the_industry_names = serializers.serialize('json', the_industry)
    the_weekly_stats_a_year_ago = serializers.serialize('json', the_stats_a_year_ago)


    if (cache.get(the_sector) or cache.get(the_stats) or cache.get(the_weekly_stats) or 
        cache.get(the_sector_names) or cache.get(the_industry) or cache.get(the_industry_names)
        or cache.get(the_weekly_stats_a_year_ago)):

        sector = cache.get(the_sector)
        industry = cache.get(the_industry)


        stats = cache.get(the_stats)
        weekly_stats = cache.get(the_weekly_stats)

        sector_names = cache.get(the_sector_names)
        industry_names = cache.get(the_industry_names)

        a_year_ago = cache.get(the_stats_a_year_ago)
        weekly_y_o_y = cache.get(the_weekly_stats_a_year_ago)
    else:
        try:
            sector = the_sector
            cache.set(the_sector, sector)

            industry = the_industry
            cache.set(the_industry, industry)

            stats = the_stats
            cache.set(the_stats, stats)

            weekly_stats = the_weekly_stats
            cache.set(the_weekly_stats, weekly_stats)

            sector_names = the_sector_names
            cache.set(the_sector_names, sector_names)

            industry_names = the_industry_names
            cache.set(the_industry_names, industry_names)

            a_year_ago = the_stats_a_year_ago
            cache.set(the_stats_a_year_ago, a_year_ago)

            weekly_y_o_y = the_weekly_stats_a_year_ago
            cache.set(the_weekly_stats_a_year_ago, weekly_y_o_y)
          
        except Exception as e:
            return redirect('/')

    for_snp = json.loads(weekly_stats)
    snp = ""
    for items in for_snp:
        if items['fields']['sector_name'] == 13:
            snp = items['fields']
  

    return render(request, 'insightsTwo/insights.html', 
                  {'stats': stats, 'sector': sector, 
                   'sector_names': sector_names,
                   'industry': industry,
                   'industry_names': industry_names,
                   'weekly_stats': weekly_stats, 
                   'snp': snp, 'weekly_y_o_y': weekly_y_o_y
                   }
                )

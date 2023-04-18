from django.shortcuts import render, redirect
from insightsTwo.models import SectorName, WeeklyStats
import json
from django.http import JsonResponse
from django.core import serializers
from django.core.cache import cache

# Create your views here.
def insights_two_home(request):
    
    the_sector = SectorName.objects.all()
    the_stats = WeeklyStats.objects.all()[:12]
    the_weekly_stats = serializers.serialize('json', the_stats)
    the_sector_names = serializers.serialize('json', the_sector)


    if cache.get(the_sector) or cache.get(the_stats) or cache.get(the_weekly_stats) or cache.get(the_sector_names) :
        sector = cache.get(the_sector)
        stats = cache.get(the_stats)
        weekly_stats = cache.get(the_weekly_stats)
        sector_names = cache.get(the_sector_names) 
    else:
        try:
            sector = the_sector
            cache.set(the_sector, sector)
            stats = the_stats
            cache.set(the_stats, stats)
            weekly_stats = the_weekly_stats
            cache.set(the_weekly_stats, weekly_stats)
            sector_names = the_sector_names
            cache.set(the_sector_names, sector_names)
          
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
                   'weekly_stats': weekly_stats, 
                   'snp': snp
                   }
                )

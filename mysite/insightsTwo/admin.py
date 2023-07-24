from django.contrib import admin
from .models import SectorName, WeeklyStats, IndustryName

# Register your models here.
@admin.register(SectorName)
class SectorNameAdmin(admin.ModelAdmin):
    list_display = ['sector_name', 'sector_image',]
    prepopulated_fields = {'slug': ('sector_name',)}

@admin.register(IndustryName)
class IndustryNameAdmin(admin.ModelAdmin):
    list_display = ['industry_name', 'sector_name', 'industry_image',]
    prepopulated_fields = {'slug': ('industry_name',)}

@admin.register(WeeklyStats)
class WeeklyStatsAdmin(admin.ModelAdmin):
    list_display = ['sector_name', 'industry_name', 'price', 'trailing_pe', 'forward_pe', 'trailing_ps', 'forward_ps', 'mrq_pb', 'pcf',
                    'quick_ratio', 'current_ratio', 'total_debt_to_equity', 'total_debt_to_capital', 'roe', 'roa',
                    'roic', 'bv_mv', 'ass_turnover', 'inv_trnover', 'op_margin', 'prof_margin', 'gross_margin',
                    'ev_revenue', 'ev_ebitda', 'date_created', 'date_updated',
    ]


    ordering = ['date_created']
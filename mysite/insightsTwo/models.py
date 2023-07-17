from django.db import models
from django.utils import timezone
from django.urls import reverse

# Create your models here.
from django.db import models

# Create your models here.
class SectorName(models.Model):
    sector_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=70, unique=True)
    sector_image = models.ImageField(upload_to='sector_images', blank=True)

    class Meta:
        ordering = ('sector_name',)
        index_together = (('id', 'slug'))

    def __str__(self):
        return self.sector_name
    
    def get_absolute_url(self):
        return reverse('insightsTwo:insights_two_home', args=[self.slug, self.sector_name])

class IndustryName(models.Model):
    industry_name = models.CharField(max_length=150)
    sector_name = models.ForeignKey(SectorName, related_name='industry_name', on_delete=models.CASCADE)
    slug = models.SlugField(max_length=150, unique=True)
    industry_image = models.ImageField(upload_to='industry_images', blank=True)

    class Meta:
        ordering = ('industry_name',)
        index_together = (('id', 'slug'))

    def __str__(self):
        return self.industry_name


class WeeklyStats(models.Model):
    sector_name = models.ForeignKey(SectorName, related_name='sector', on_delete=models.CASCADE)
    industry_name = models.ForeignKey(IndustryName, related_name='industry', on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    trailing_pe = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    forward_pe = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    trailing_ps = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    forward_ps = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    mrq_pb = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    pcf = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    quick_ratio = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    current_ratio = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total_debt_to_equity = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total_debt_to_capital = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    roe = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    roa = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    roic = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    bv_mv = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    ass_turnover = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    inv_trnover =models.DecimalField(max_digits=10, decimal_places=2, null=True)
    op_margin = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    prof_margin = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    gross_margin = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    ev_revenue = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    ev_ebitda = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        index_together = (('sector_name', 'date_created'))
        index_together = (('industry_name', 'date_created'))
        ordering = ('-date_created',)
        verbose_name_plural='Weekly Stats'

    
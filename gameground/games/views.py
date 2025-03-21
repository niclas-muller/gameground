from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

def squareMinesweeper(request):
    template = loader.get_template('squareMinesweeper.html')
    return HttpResponse(template.render())

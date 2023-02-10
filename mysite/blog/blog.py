from blog.models import Post
from django.shortcuts import render, get_object_or_404


class PostStats(object):

    def count(self, year, month, day, post):
        post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)
 
        print('post poststats', post)
        text = post.body

        letters = 0
        words = 1
        sentence = 0
        for i in range(len(text)):
            if text[i].isalpha():
                letters += 1
            elif text[i] == " ":
                words += 1
            elif text[i] == "." or text == "?" or text == "!":
                sentence += text

        print('PostStats words', words)
        return words

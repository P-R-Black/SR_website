from blog.models import Post
from django.shortcuts import render, get_object_or_404




def count():
    post = Post.objects.all()

    posted = Post()

    print('post poststats', posted)
    for p in posted:
        print('p', p)
    # text = post.body

    # letters = 0
    # words = 1
    # sentence = 0
    # for i in range(len(text)):
    #     if text[i].isalpha():
    #         letters += 1
    #     elif text[i] == " ":
    #         words += 1
    #     elif text[i] == "." or text == "?" or text == "!":
    #         sentence += text

    # print('PostStats words', words)
    # return words



count()
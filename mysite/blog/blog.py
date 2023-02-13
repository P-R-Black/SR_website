from .models import Post


def get_word_count(the_text):
    letters = 0
    words = 1
    sentence = 0

    for i in range(len(the_text)):
        if the_text[i].isalpha():
            letters += 1
        elif the_text[i] == " ":
            words += 1
        elif the_text[i] == '.' or the_text[i] == '?' or the_text[i] == '!':
            sentence += 1

    return words


def get_read_time(the_text):
    word_count = get_word_count(the_text)
    time_taken = word_count / 200
    whole_number = int(time_taken)
    decimal_nums = (time_taken % 1) * .60

    if decimal_nums > .30:
        time_to_read = whole_number + 1
    else:
        time_to_read = whole_number

    return time_to_read


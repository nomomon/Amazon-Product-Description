# Amazon product description generator for [texta.ai](https://texta.ai)
[Видео туториал](https://www.youtube.com/watch?v=GzHJ3NUVtV4)

Все не так уж и сложно. Для начала скачаем нужную библиотеку.

```
$ pip install happytransformer
```

Скачиваем модельку с [drive](https://drive.google.com/drive/folders/1a4SclxrGzdjrNlG4sUT3Wzpyn8qqxWLu?usp=sharing) или с этой github repo. Тут всего 4 варианта (0 тренировалась меньше всех, 3 больше).

Подклучаем эту библиотеку и загружаем выбранную модельку, указывая на нее путь в `directory`.

```python
from happytransformer import HappyGeneration

happy_gen = HappyGeneration(load_path="/content/drive/MyDrive/GPT-Neo_Amazon/3/")
```

Далее, можно задать настройки генирации. Если все есть вопросы, что это за настройки, то можно посмотреть их [тут](https://happytransformer.com/text-generation/settings/).

```python
min_length =  10
max_length = 100 
do_sample = True
early_stopping = True
num_beams = 1 
temperature = 0.6
top_k = 50
top_p = 0.8
no_repeat_ngram_size = 1

gen_args = GENSettings(min_length, max_length, do_sample, early_stopping, num_beams, temperature, top_k, no_repeat_ngram_size, top_p)
```

Для генерации, запускаем следующию функцию, где `text` это промпт который используем. Примеры таких можно найти в вкладке Test Model этого файла. Результат генерации находится в `result.text`.

```python
result = happy_gen.generate_text(text, args=gen_args)

print(result.text)
```

Вроде все. Спасибо за внимание.

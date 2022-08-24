# Amazon Description Generator

AI that generates Amazon-style product descriptions using a fine-tuned GPT-Neo model. Built as a proof of concept for [Texta.ai](https://texta.ai/).

## What's this about

The founder of Texta.ai reached out — they were using GPT-3 to generate product descriptions but it was too expensive. I built a cheaper alternative by fine-tuning [GPT-Neo](https://www.eleuther.ai/projects/gpt-neo/) on scraped Amazon product data.

Started with Puppeteer scraping from Amazon directly, but it was painfully slow. Switched to a pre-scraped [dataset from UCSD](https://jmcauley.ucsd.edu/data/amazon/). Cleaned the data, shaped it into prompt templates, and fine-tuned multiple models using [HappyTransformer](https://happytransformer.com/) on Google Colab.

There are 4 model variants (0–3), each trained progressively longer. Model 3 gives the best results.

## How to launch

```bash
pip install happytransformer
```

Then open the notebook:

```bash
jupyter notebook Texta_ai_Amazon_gpt_neo.ipynb
```

Download models from [Google Drive](https://drive.google.com/drive/folders/1a4SclxrGzdjrNlG4sUT3Wzpyn8qqxWLu?usp=sharing) or use the ones in this repo. Point `load_path` to your chosen model directory.

[Video tutorial](https://www.youtube.com/watch?v=GzHJ3NUVtV4) (in Russian)

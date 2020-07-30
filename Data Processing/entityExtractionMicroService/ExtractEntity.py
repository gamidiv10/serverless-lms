from collections import Counter
import spacy
#https://towardsdatascience.com/named-entity-recognition-with-nltk-and-spacy-8c4a7d88e7da
class ExtractEntities:
    def extractEntities(text):
    #nlp = en_core_web_sm.load()
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(text)
        l = [(X.text) for X in doc.ents]
        print(type(l))
        l = Counter(l).most_common()
        print(l)
        return l

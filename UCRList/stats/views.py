from django.shortcuts import render
from django.views.generic import View

from lists.models import ListItem, List, TopicTag

class SearchView(View):
    def get(self, request):
        # simply return the rendering page to display the form
        return render(request, 'searching/index.html')

    '''
        function getQuerySet
        param
            query list of words part of a query
            category string of what category to search
        this function will take in a query and perform a textual search through lists
        If a category is provided, an additional filtering for category will occur.
    '''
    def getQuerySet(self, query, category=None):
        querySet=set()
        topicNumber=self.translateCategory(category)

        for word in query:
            if len(word) <= 2:
                continue

            # do a query for List titles that contain the word
            titleResults = List.objects.filter(title__icontains=word)
            for l in titleResults:
                querySet.add(l)
                print l.title
            # do a query for list item descriptions and titles that contain the word
            results = ListItem.objects.filter(descriptionhtml__icontains=word)
            results |= ListItem.objects.filter(title__icontains=word)
            # add lists into queryset
            for li in results:
                # here check if the list that the li belongs to has the category as topic
                if topicNumber is not None:
                    #print "using category filter on: " + str(li.listid) + " with topic " + str(topicNumber) + ": " + str(category)
                    results = None
                    try:
                        results = TopicTag.objects.get(list=li.listid, topic=topicNumber)
                    except TopicTag.DoesNotExist:
                        # do nothing if it doesn't exist. this means that that list is not tagged with topic
                        continue
                    if results is not None:
                        #print "adding " + str(li.listid) + " (topic filtered)"
                        querySet.add(li.listid)
                else:
                    #print "adding " + str(li.listid) + " (no filter)"
                    querySet.add(li.listid)

        return querySet

    def translateCategory(self, category = None):
        if(category is None):
            return None

        return {
                "Music":    1,
                "Movies":   2,
                "TV":       3,
                "Science":  4,
                "Politics": 5,
            }[category]

    def post(self, request):
        query = request.POST.get('query').strip(" ").strip("\t").strip("\n")
        querySet = set()
        catSearched = False

        if query is not None:
            query = query.split(' ')

            # filter out the query set by Topic
            if request.POST.get('cbmusic') is not None:
                catSearched = True;
                querySet = querySet.union(self.getQuerySet(query, "Music"))
            if request.POST.get('cbmovies') is not None:
                catSearched = True;
                querySet = querySet.union(self.getQuerySet(query, "Movies"))
            if request.POST.get('cbtv') is not None:
                catSearched = True;
                querySet = querySet.union(self.getQuerySet(query, "TV"))
            if request.POST.get('cbscience') is not None:
                catSearched = True;
                querySet = querySet.union(self.getQuerySet(query, "Science"))
            if request.POST.get('cbpolitics') is not None:
                catSearched = True;
                querySet = querySet.union(self.getQuerySet(query, "Politics"))

            # NO CATEGORY FILTERING TOOK PLACE, search textually
            if not catSearched:
                # there were no categories selected
                querySet = querySet.union(self.getQuerySet(query))


        return render(request, 'searching/results.html', {'queryResultSet':querySet})

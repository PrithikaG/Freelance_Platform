import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_job(resume, job_descriptions):
    # Combine the resume with job descriptions for TF-IDF vectorization
    all_documents = [resume] + job_descriptions
    
    # Initialize the TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(stop_words='english')
    
    # Fit the TF-IDF vectorizer and transform the documents
    tfidf_matrix = vectorizer.fit_transform(all_documents)
    
    # The resume will be the first document (index 0) and job descriptions will follow
    resume_vector = tfidf_matrix[0]
    job_vectors = tfidf_matrix[1:]
    
    # Calculate cosine similarity between the resume and each job description
    similarity_scores = cosine_similarity(resume_vector, job_vectors)
    
    
    return similarity_scores.flatten()

if __name__ == "__main__":
    
    resume = sys.argv[1]
    job_descriptions = sys.argv[2:]

  
    match_scores = match_job(resume, job_descriptions)
    
    
    for score in match_scores:
        print(score)

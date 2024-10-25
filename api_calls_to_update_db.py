import requests

# Base URL of your Next.js application
BASE_URL = "http://localhost:3000/api"

def create_domain(domain_data):
    response = requests.post(f"{BASE_URL}/domains", json=domain_data)
    print_response_info(response)
    return response.json() if response.ok else None

def create_availability_status(status_data):
    response = requests.post(f"{BASE_URL}/availability-status", json=status_data)
    print_response_info(response)
    return response.json() if response.ok else None

def create_evaluation(evaluation_data):
    response = requests.post(f"{BASE_URL}/evaluation", json=evaluation_data)
    print_response_info(response)
    return response.json() if response.ok else None

def create_seo_analysis(seo_data):
    response = requests.post(f"{BASE_URL}/seo-analysis", json=seo_data)
    print_response_info(response)
    return response.json() if response.ok else None

def print_response_info(response):
    print("--------------------------------")
    print(f"Status Code: {response.status_code}")
    print(f"Response Content: {response.text}")

# Example usage:
new_domain = {
    "domainName": "example3.com",
    "tld": "com",
    "length": 11,
    "processedByAgent": "Agent1",
    "agentModel": "Model1"
}
created_domain = create_domain(new_domain)
print("Created domain:", created_domain)

if created_domain:
    domain_id = created_domain['id']

    new_availability_status = {
        "domainId": domain_id,
        "status": "Available",
        "processedByAgent": "bot-323",
        "agentModel": "ModelX"
    }
    created_availability_status = create_availability_status(new_availability_status)
    print("Created availability status:", created_availability_status)

    new_evaluation = {
        "domainId": domain_id,
        "possibleCategories": ["tech", "business"],
        "possibleKeywords": ["innovation", "growth"],
        "memorabilityScore": 8,
        "pronounceabilityScore": 7,
        "brandabilityScore": 9,
        "description": "Strong brand potential",
        "processedByAgent": "agent-001",
        "agentModel": "ModelX"
    }
    # Note: overallScore is not included here as it will be calculated on the server
    created_evaluation = create_evaluation(new_evaluation)
    print("Created evaluation:", created_evaluation)

    new_seo_analysis = {
        "domainId": domain_id,
        "seoKeywords": ["seo", "analysis"],
        "seoKeywordRelevanceScore": 8,
        "industryRelevanceScore": 7,
        "domainAge": 2,
        "potentialResaleValue": 1000,
        "language": "English",
        "trademarkStatus": "Pending",
        "scoredByAgent": "agent-001",
        "agentModel": "ModelX",
        "description": "SEO analysis description"
    }
    created_seo_analysis = create_seo_analysis(new_seo_analysis)
    print("Created SEO analysis:", created_seo_analysis)

# Example of creating multiple domains
new_domains = [
    {
        "domainName": "example1.com",
        "tld": "com",
        "length": 11,
        "processedByAgent": "Agent1",
        "agentModel": "Model1"
    },
    {
        "domainName": "example2.com",
        "tld": "com",
        "length": 11,
        "processedByAgent": "Agent2",
        "agentModel": "Model2"
    }
]

for domain_data in new_domains:
    created_domain = create_domain(domain_data)
    print(f"Created domain: {created_domain}")

    if created_domain:
        domain_id = created_domain['id']

        # Create related records for each domain
        availability_status = create_availability_status({
            "domainId": domain_id,
            "status": "Available",
            "processedByAgent": "bot-323",
            "agentModel": "ModelX"
        })
        print(f"Created availability status for {domain_data['domainName']}: {availability_status}")

        evaluation = create_evaluation({
            "domainId": domain_id,
            "possibleCategories": ["tech", "business"],
            "possibleKeywords": ["innovation", "growth"],
            "memorabilityScore": 8,
            "pronounceabilityScore": 7,
            "brandabilityScore": 9,
            "description": "Strong brand potential",
            "processedByAgent": "agent-001",
            "agentModel": "ModelX"
        })
        print(f"Created evaluation for {domain_data['domainName']}: {evaluation}")

        seo_analysis = create_seo_analysis({
            "domainId": domain_id,
            "seoKeywords": ["seo", "analysis"],
            "seoKeywordRelevanceScore": 8,
            "industryRelevanceScore": 7,
            "domainAge": 2,
            "potentialResaleValue": 1000,
            "language": "English",
            "trademarkStatus": "Pending",
            "scoredByAgent": "agent-001",
            "agentModel": "ModelX",
            "description": "SEO analysis description"
        })
        print(f"Created SEO analysis for {domain_data['domainName']}: {seo_analysis}")

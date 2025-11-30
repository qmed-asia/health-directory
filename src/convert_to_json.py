import csv
import json
import os

def csv_to_json(csv_path, json_path):
    data = []
    try:
        with open(csv_path, mode='r', encoding='utf-8-sig') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                # Clean up keys and values
                clean_row = {k.strip(): v.strip() for k, v in row.items() if k}
                data.append(clean_row)
        
        with open(json_path, mode='w', encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4)
        print(f"Successfully converted {csv_path} to {json_path}")
    except Exception as e:
        print(f"Error converting {csv_path}: {e}")

def main():
    # Define paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dist_dir = os.path.join(base_dir, 'dist')
    raw_data_dir = os.path.join(base_dir, 'raw_data')
    hospital_list_dir = os.path.join(base_dir, 'hospital_list')

    # Ensure dist directory exists
    os.makedirs(dist_dir, exist_ok=True)

    # Convert Hospital List
    hospital_csv = os.path.join(hospital_list_dir, 'hospital_list_updated_2023-07-28.csv')
    hospital_json = os.path.join(dist_dir, 'hospitals.json')
    if os.path.exists(hospital_csv):
        csv_to_json(hospital_csv, hospital_json)
    
    # Convert Doctor Lists from raw_data
    for filename in os.listdir(raw_data_dir):
        if filename.endswith('.csv'):
            name = os.path.splitext(filename)[0]
            # Normalize name
            name = name.replace('_scrape', '').replace('_scrap', '').replace('_list', '')
            
            csv_path = os.path.join(raw_data_dir, filename)
            json_path = os.path.join(dist_dir, f'doctors_{name}.json')
            csv_to_json(csv_path, json_path)

if __name__ == "__main__":
    main()

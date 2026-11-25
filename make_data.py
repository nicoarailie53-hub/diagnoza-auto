import base64, json
# Compact data encoded as base64 (will be decoded here)
base64_str = "H4sIAAAAAAAAA+3SsU7CMBBG8f6R8Bf7ZwBgRbH1H6EAQQ3M2eV68P9IqXlF7V1dXm9lZWVdHd8v+Mjjv22q7u7u7u6u7e6jY2NjfX19UuLz6dZf9jW1lZWV1eH8zL0zJz89N0/5xj7/Z9YedR0c7fwQAA//8K4AAwAA"
data = base64.b64decode(base64_str).decode('utf-8')
codes = json.loads(data)
print("Decoded", len(codes), "codes")

## Text Analytics Low Level Client

Prototype for Text Analytics that's a general REST client combined with service-specific TypeScript types to help navigate and use the [REST API][rest_api] directly.

### Install

```bash
npm install https://github.com/joheredi/ta-lowlevel-prototype @azure/identity
```

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Text Analytics resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind TextAnalytics --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Create and authenticate a `TextAnalytics` client

To create a client object to access the Text Analytics API, you will need the `endpoint` of your Text Analytics resource and a `credential`. The Text Analytics client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can find the endpoint for your text analytics resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "properties.endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Text Analytics resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```js
import TextAnalytics from "@azure/textanalytics-lowlevel";

const client = TextAnalytics({ key: "<API key>" }, "<endpoint>");
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK.

You will also need to [register a new AAD application][register_aad_app] and grant access to Text Analytics by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
// import {createTextAnalyticsVerbFirst as TextAnalytics} from "@azure/textanalytics-lowlevel";
import { createTextAnalyticsPathFirst as TextAnalytics } from "@azure/textanalytics-lowlevel";
import { DefaultAzureCredential } from "@azure/identity";

const client = TextAnalytics(new DefaultAzureCredential(), "<endpoint>");
```

### Samples with Path First

#### Call an endpoint

```typescript
import {
  createTextAnalyticsPathFirst as TextAnalytics,
  TextDocumentInput,
} from "@azure/textanalytics-lowlevel";

const endpoint = "https://<accountName>.cognitiveservices.azure.com/";
const key = process.env["API_KEY"] || "<API KEY>";

const documents: TextDocumentInput[] = [
  { id: "1", text: "This is my fake SSN 22-333-4444" },
];

async function analyzeText() {
  const client = TextAnalytics({ key }, endpoint);

  const recognitionClient = client("/entities/recognition").subclient;
  const piiClient = recognitionClient("/pii");
  const generalRecognitionClient = recognitionClient("/general");

  const piiResult = await piiClient.post({ body: { documents } });
  const generalResult = await generalRecognitionClient.post({
    body: { documents },
  });
  console.log(piiResult);
  if (piiResult.status === 200) {
    console.log(`=== PII Results ===`);
    for (const doc of piiResult.body.documents) {
      console.log(`Redated Text: ${doc.redactedText}`);
    }
  }

  if (generalResult.status === 200) {
    console.log(`=== General Results ===`);
    for (const doc of generalResult.body.documents) {
      console.log(`${JSON.stringify(doc.entities)}`);
    }
  }
}

analyzeText().catch(console.error);
```

### Samples with Verb First

#### Call an endpoint

```typescript
import { createTextAnalyticsVerbFirst as TextAnalytics } from "@azure/textanalytics-lowlevel";

const endpoint = "https://<accountName>.cognitiveservices.azure.com";
const key = process.env["API_KEY"] || "<API KEY>";

async function analyzeLanguage() {
  const client = TextAnalytics({ key }, endpoint);

  const languagesResult = await client.request("POST /languages", {
    body: { documents: [{ id: "1", text: "This is a test text" }] },
  });

  if (languagesResult.status === 200) {
    for (const result of languagesResult.body.documents) {
      console.log(
        `Sentence with Id: '${result.id}' detected language: ${
          result.detectedLanguage.name
        } with ${result.detectedLanguage.confidenceScore * 100}% confidence`
      );
    }
  } else {
    throw languagesResult.body.error;
  }
}

analyzeLanguage().catch(console.error);
```

### Call an arbitrary endpoint with requestUnchecked

```typescript
import { createTextAnalyticsVerbFirst as TextAnalytics } from "@azure/textanalytics-lowlevel";

const endpoint = "https://<accountName>.cognitiveservices.azure.com";
const key = process.env["API_KEY"] || "<API KEY>";

async function analyzeLanguage() {
  const client = TextAnalytics({ key }, endpoint);

  const languagesResult = await client.requestUnchecked("POST /languages", {
    body: { documents: [{ id: "1", text: "This is a test text" }] },
  });

  if (languagesResult.status === 200) {
    for (const result of languagesResult.body.documents) {
      console.log(
        `Sentence with Id: '${result.id}' detected language: ${
          result.detectedLanguage.name
        } with ${result.detectedLanguage.confidenceScore * 100}% confidence`
      );
    }
  } else {
    throw languagesResult.body.error;
  }
}

analyzeLanguage().catch(console.error);
```

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cognitive_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[rest_api]: https://westus2.dev.cognitive.microsoft.com/docs/services/TextAnalytics-v3-1-preview-3/

# A Machine Learning Model to Classify the Feature ModelMaintainability

Software Product Lines (SPL) are generally specified using a Feature Model (FM), an artifact designed in the early stages of the SPL development life cycle. This artifact can quickly become too complex, which makes it challenging to maintain an SPL. Therefore, it is essential to evaluate the maintainability of this artifact from measurements continuously. The literature brings some approaches that evaluate FM maintainability through the aggregation of maintainability measures. Machine Learning (ML) models can be used to create these approaches. They can aggregate the values of independent variables into a single target data, also called a dependent variable. Besides, when using white box ML models, it is possible to interpret and explain the ML model results. This work proposesML white-box models intending to classify the FM maintainability based on 15 measures. To build the models, we performed the following steps: (i) we compared two approaches to evaluate the FMmaintainability through an oracle of FM maintainability classifications; (ii) we used the best approach to pre-classify the ML training dataset; (iii) we generated 3 ML models and compared them against classification accuracy, precision, recall, F1 and AUC-ROC; and, (iv)we used the best model to create a mechanism capable of providing improvement indicators to domain engineers. The best model used the decision tree algorithm that obtained accuracy, precision, and recall of 0.81, F1-Score of 0.79, and AUC-ROC of 0.91. Using this model, we could reduce the number of measures needed to evaluate the FM maintainability from 15 to 9 measures.

## Maintainability Classification Tool

In this work, we build a tool to assess the maintainability of a feature model and make it available at [https://publiosilva.github.io/tcc-2](https://publiosilva.github.io/tcc-2). We also make the tool's [source code](https://github.com/publiosilva/tcc-2/tree/master/maintainability-classification) available.
## Datasets


| Dataset | Description | Size | Original Files |
|---------|-------------|------|----------------|
| [Original dataset](https://github.com/publiosilva/tcc-2/blob/master/unclassified-dataset.csv) | This is the original (unclassified) dataset. | 342 | [Files](https://github.com/publiosilva/tcc-2/tree/master/feature-models)
| [Oliveira dataset](https://github.com/publiosilva/tcc-2/blob/master/oliveira-dataset.csv) | The Oliveira dataset contains the same feature models as the original dataset but classified using Oliveira's approach. We use this dataset in the training of machine learning algorithms. | 342 | [Files](https://github.com/publiosilva/tcc-2/tree/master/feature-models)
| [Silva dataset](https://github.com/publiosilva/tcc-2/blob/master/silva-dataset.csv) | The Oliveira dataset contains the same feature models as the original dataset but classified using Silva's approach. | 342 | [Files](https://github.com/publiosilva/tcc-2/tree/master/feature-models)
| [Dataset evaluated by SPL experts](https://github.com/publiosilva/tcc-2/blob/master/expert-evaluation/measures.csv) | This dataset was manually evaluated by a group of 15 experts in SPL. | 50 | [Files](https://github.com/publiosilva/tcc-2/tree/master/expert-evaluation/feature-models)

## Notebooks

| Notebook | Description |
|----------|-------------|
| [Decision Tree](https://github.com/publiosilva/tcc-2/blob/master/notebooks/Decicion-Tree.ipynb) | Procedures for training the decision tree model are specified in this notebook. |
| [Logistic Regression](https://github.com/publiosilva/tcc-2/blob/master/notebooks/Logistic-Regression.ipynb) | Procedures for training the logistic regression model are specified in this notebook. |
| [Naive Bayes](https://github.com/publiosilva/tcc-2/blob/master/notebooks/Naive-Bayes.ipynb) | Procedures for training the Naive Bayes model are specified in this notebook. |
| [Cross Validation](https://github.com/publiosilva/tcc-2/blob/master/notebooks/K-fold.ipynb) | In this notebook, a 5-step cross-validation is performed for the 3 machine learning models. |
| [Independent Variables Selection](https://github.com/publiosilva/tcc-2/blob/master/notebooks/Feature-Selection.ipynb) | In this notebook, the procedures for selecting independent variables are specified. |
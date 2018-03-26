from setuptools import setup, find_packages

from api_client import meta

setup(
    name=meta.display_name,
    version=meta.version,
    description=meta.description,
    author=meta.author,
    author_email=meta.author_email,
    url=meta.url,
    license=meta.license,
    packages=find_packages(exclude=['tests']),
    long_description="",
    classifiers=[
        "Topic :: Database",
    ],
)

// analyzeNote.cpp
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>

using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    ifstream file(argv[1]);
    string word, text;
    vector<string> words;

    while (file >> word) {
        words.push_back(word);
        if (word.length() > 0)
            text += word + " ";
    }

    string longest = "";
    for (string w : words)
        if (w.length() > longest.length())
            longest = w;

    cout << "{\n";
    cout << "  \"word_count\": " << words.size() << ",\n";
    cout << "  \"longest_word\": \"" << longest << "\"\n";
    cout << "}\n";

    return 0;
}

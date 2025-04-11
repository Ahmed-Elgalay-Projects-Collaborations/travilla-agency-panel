import React, { useState } from 'react';
import { FadeIn } from '../../../animations/FadeIn';
import DOMPurify from 'dompurify';
import { Save, Edit2 } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';  // Import TinyMCE editor
import { toast } from 'react-toastify';

const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY; // Ensure you have your API key set in .env file

const initialContent = `
<h2 class="text-2xl font-bold mb-4">About Our Travel Agency</h2>
<p class="text-gray-600 mb-6">
  Welcome to Our Company, where we transform travel dreams into unforgettable experiences. 
  With over a decade of expertise in the travel industry, we specialize in creating 
  personalized journeys that cater to every traveler's unique preferences and desires.
</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Our Mission</h3>
    <p class="text-gray-600">
      To provide exceptional travel experiences that create lasting memories for our clients.
    </p>
  </div>
  
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Our Vision</h3>
    <p class="text-gray-600">
      To become the most trusted travel partner for adventurers worldwide.
    </p>
  </div>
  
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Our Values</h3>
    <p class="text-gray-600">
      Excellence, integrity, and customer satisfaction in everything we do.
    </p>
  </div>
</div>

<h3 class="text-xl font-semibold mb-4">Why Choose Us?</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600">
  <li>Personalized travel experiences</li>
  <li>24/7 customer support</li>
  <li>Expert local guides</li>
  <li>Best price guarantee</li>
  <li>Sustainable tourism practices</li>
</ul>
`;

export const AboutPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    setContent(editedContent); // Save edited content
    setIsEditing(false);       // Switch back to view mode

    try {
      // Simulate saving to a server or database
      // In a real application, you would replace this with an API call
      // For example: await saveContentToServer(editedContent);
      console.log('Content saved:', editedContent);

      toast.success('Content saved successfully!'); // Show success message
    }
    catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content. Please try again.'); // Show error message
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">About Page</h2>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Edit2 className="w-5 h-5" />
              <span>Edit Content</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {isEditing ? (
            <div className="p-6">
              <Editor
                apiKey={API_KEY}  // Make sure you have a TinyMCE API key (or use the free version)
                value={editedContent}
                init={{
                  plugins: [
                    // Core editing features
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Apr 25, 2025:
                    'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                  ],
                  height: 500,
                  menubar: false,
                  // plugins: 'link image code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image',
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={(newValue) => setEditedContent(newValue)} // Update editedContent on change
              />
            </div>
          ) : (
            <div
              className="p-6 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content), // Sanitizing before rendering
              }}
            />
          )}
        </div>
      </FadeIn>
    </div>
  );
};

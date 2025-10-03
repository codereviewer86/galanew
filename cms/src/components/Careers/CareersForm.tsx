import { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
//@ts-ignore
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './draft-wysiwyg.css';
import Form from '../form/Form';
import Label from '../form/Label';
import Input from '../form/input/InputField';

interface Job {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CareersFormProps {
  job?: Job | null;
  onSave: (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  language: 'en' | 'ru';
}

export default function CareersForm({ job, onSave, onCancel, language }: CareersFormProps) {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      // Convert HTML to DraftJS editor state
      const contentBlock = htmlToDraft(job.description || '');
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
    } else {
      setTitle('');
      setEditorState(EditorState.createEmpty());
    }
    setErrors([]);
  }, [job]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!title.trim()) {
      newErrors.push('Job title is required');
    }

    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (!htmlContent.trim() || htmlContent.trim() === '<p></p>') {
      newErrors.push('Job description is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert DraftJS state to HTML
      const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      
      await onSave({
        title: title.trim(),
        description: htmlContent
      });
    } catch (error) {
      setErrors(['Failed to save job. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          {job ? 'Edit Job' : 'Add New Job'} ({language.toUpperCase()})
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {job ? `Update the job details below in ${language === 'en' ? 'English' : 'Russian'}` : `Fill in the details for the new job posting in ${language === 'en' ? 'English' : 'Russian'}`}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <ul className="text-red-700 dark:text-red-400 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 mb-2">
            Job Title *
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full"
          />
        </div>

        {/* Job Description */}
        <div>
          <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 mb-2">
            Job Description *
          </Label>
          
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Editor
              editorState={editorState}
              toolbarClassName="draft-toolbar"
              wrapperClassName="draft-wrapper"
              editorClassName="draft-editor"
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
                blockType: {
                  inDropdown: true,
                  options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                },
                list: {
                  options: ['unordered', 'ordered'],
                },
                textAlign: {
                  options: ['left', 'center', 'right'],
                },
                link: {
                  options: ['link'],
                },
                history: {
                  options: ['undo', 'redo'],
                },
              }}
              placeholder="Enter detailed job description..."
            />
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Use the toolbar above to format your job description with bold text, lists, and more.
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{job ? 'Update Job' : 'Create Job'}</span>
          </button>
        </div>
      </Form>
    </div>
  );
}
